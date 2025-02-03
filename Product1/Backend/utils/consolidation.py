import pandas as pd
import logging
import re

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)



class ProcessExcelFiles:
    """
    A class to process and clean Excel files dynamically.
    """

    def __init__(self):
        pass
    
    def is_garbage(self, row, threshold=0.5):
        """
        Determine if a row or column is considered garbage based on the non-empty ratio.
        Treats NaN, empty strings, and strings with only whitespaces as empty.
        """
        non_empty_count = row.apply(lambda x: not (pd.isna(x) or str(x).strip() == ""))
        non_empty_ratio = non_empty_count.sum() / len(row)
        return non_empty_ratio < threshold
    
    def ensure_header(self, df):
        """
        Ensure the DataFrame has a proper header.
        Detects headers by evaluating the first few rows and checks for consistency.
        """
        # Check first few rows to identify potential headers
        sample_rows = df.head(5)
        for i in range(len(sample_rows)):
            if all(isinstance(x, str) and x.strip() for x in sample_rows.iloc[i]):
                df.columns = sample_rows.iloc[i]
                df = df[i + 1:].reset_index(drop=True)
                return df
        return df  # Return original if no valid header detected

    def detect_header_footer(self, df, row_threshold=0.5, col_threshold=0.5, sample_size=5):
        """
            Detect header and footer rows considered garbage based on a threshold.
        """
        header_rows = []
        footer_rows = []

        # Detect garbage rows in the first few rows (headers)
        for i in range(min(sample_size, len(df))):
            if self.is_garbage(df.iloc[i], row_threshold):
                header_rows.append(i)

        # Detect garbage rows in the last few rows (footers)
        for i in range(len(df) - 1, max(len(df) - sample_size - 1, -1), -1):
            if self.is_garbage(df.iloc[i], row_threshold):
                footer_rows.append(i)

        # Detect garbage columns (entirely optional based on column threshold)
        garbage_cols = df.apply(lambda col: self.is_garbage(col, col_threshold), axis=0)
        garbage_cols = df.columns[garbage_cols]

        return header_rows, footer_rows, garbage_cols
    
    def clean_data(self, df, garbage_threshold=0.5, sample_size=5):
        """
        Clean the DataFrame by removing garbage rows and columns.
        """
        # Detect garbage rows and columns
        header_rows, footer_rows, garbage_cols = self.detect_header_footer(df, garbage_threshold, garbage_threshold, sample_size)

        # Remove detected rows and columns
        df_cleaned = df.drop(index=header_rows + footer_rows, errors="ignore")
        df_cleaned = df_cleaned.drop(columns=garbage_cols, errors="ignore")

        # Remove garbage rows after header/footer detection
        df_cleaned = df_cleaned.loc[~df_cleaned.apply(self.is_garbage, axis=1)]

        # Reset headers if applicable
        df_cleaned = self.ensure_header(df_cleaned)

        return df_cleaned

    def find_closing_balance_columns(self, df):
        """
        Dynamically find columns that represent "Closing Balance" which could be written in various forms
        like "CB", "Closing Balance", "C/B", "Cls Bal", "ClosingBal", or concatenated with month/year names.
        """
        closing_balance_cols = []
        # Enhanced regex to capture more variations of "Closing Balance"
        pattern = re.compile(
            r'\b(CB|Closing Balance|C/B|Cls Bal|ClosingBal|Close Balance|Cl Bal|End Bal|End Balance)\b',
            re.IGNORECASE
        )
        for col in df.columns:
            if pattern.search(col):
                closing_balance_cols.append(col)
        return closing_balance_cols

    def extract_year_from_sheet_name(self, sheet_name):
        """
        Extract a year and optional quarter from the sheet name.
        Supports case-sensitive formats like:
        - "2018 Q1", "Q1 2018"
        - "2019 Quarter 2", "Quarter 2 2019"
        - "2020 3", "3 2020"
        - Standalone years like "2021"
        """
        # Case-sensitive regex for years and quarters
        match = re.search(
            r'\b((19|20)\d{2})\s*(?:Q([1-4])|([1-4])|Quarter\s*([1-4]))?|'  # Year followed by quarter
            r'(?:Q([1-4])|([1-4])|Quarter\s*([1-4]))\s*((19|20)\d{2})\b',   # Quarter followed by year
            sheet_name
        )

        if not match:
            return None  # No match found

        # Extract year and quarter details
        year = match.group(1) or match.group(9)  # Year in the match
        quarter = match.group(3) or match.group(4) or match.group(5) or match.group(6) or match.group(7) or match.group(8)

        # Format result
        if year and quarter:
            return f"{year} Q{quarter}"
        elif year:
            return year
        else:
            return None

    def read_excel_file(self, uploaded_file, garbage_threshold=0.5, sample_size=5):
        """
        Read and clean all sheets from an uploaded Excel file.
        Dynamically handle different sheet names and column variations.
        """
        data_list = []
        try:
            excel_file = pd.ExcelFile(uploaded_file)
            sheets = excel_file.sheet_names
            for sheet in sheets:
                print(sheet)
                df = pd.read_excel(uploaded_file, sheet_name=sheet)
                df_cleaned = self.clean_data(df, garbage_threshold, sample_size)

                # Dynamically find closing balance columns
                closing_balance_cols = self.find_closing_balance_columns(df_cleaned)
                
                # Retain other important columns alongside closing balances
                non_month_columns = [col for col in df_cleaned.columns if not re.search(r'\b(month|year)\b', col, re.IGNORECASE)]

                # Combine closing balance columns with non-month financial columns
                relevant_columns = non_month_columns + closing_balance_cols
                df_cleaned = df_cleaned[relevant_columns]

                # Handle sheet names: Use the sheet name as the 'Year' if no year columns
                year = self.extract_year_from_sheet_name(sheet)
                if year:
                    df_cleaned['Year'] = year
                else:
                    # If no year in the sheet name, check if there are month columns to extract time data
                    month_cols = [col for col in df_cleaned.columns if re.search(r'\b(month|year)\b', col, re.IGNORECASE)]
                    if month_cols:
                        df_cleaned['Year'] = df_cleaned[month_cols].apply(lambda x: x[0], axis=1)
                    else:
                        df_cleaned['Year'] = 'Unknown'

                df_cleaned['file_name'] = uploaded_file.name
                data_list.append(df_cleaned)

            if data_list:
                data = pd.concat(data_list, ignore_index=True)
            else:
                data = pd.DataFrame()
            return data
        except Exception as e:
            logger.error(f"Error reading Excel file {uploaded_file.name}: {e}")
            return pd.DataFrame()

    def process_file(self, uploaded_file):
        """
        Process the uploaded Excel file and convert it to a JSON-serializable format.
        """
        try:
            data = self.read_excel_file(uploaded_file)
            return data.astype(object).where(pd.notnull(data), None).to_dict(orient='records')
        except Exception as e:
            logger.error(f"Error processing file {uploaded_file.name}: {e}")
            return {"status": "error", "message": str(e)}


class DynamicDataMapper:
    """
    A class to map and pivot data dynamically based on a mapping configuration.
    """

    def __init__(self, mapping_config):
        self.mapping_config = mapping_config

    def remove_duplicate_columns(self, data):
        """
        Remove duplicate columns from the DataFrame.
        """
        duplicated_columns = data.columns.duplicated()

        if duplicated_columns.any():
            duplicate_cols = data.columns[duplicated_columns]
            data = data.loc[:, ~data.columns.duplicated()]

        return data

    def extract_date_parts(self, data, date_column):
        """
        Extract year and month from a date column.
        """
        if "sheet_name" in data.columns and date_column not in data.columns:
            data = data.rename(columns={"sheet_name": "Year"})
            return data  # Early return since no further date processing is needed

        if date_column not in data.columns:
            raise ValueError(f"Date column '{date_column}' not found in the data.")

        data[date_column] = pd.to_datetime(data[date_column], errors='coerce')

        data['Year'] = data[date_column].dt.year
        data['Month'] = data[date_column].dt.month_name()

        return data

    def filter_closing_balance_columns(self, mapped_data):
        """
        Filter the columns that contain 'Closing Balance' for each month or year.
        """
        # Identify columns that are related to time (Month/Year)
        time_columns = [col for col in mapped_data.columns if re.search(r'(Month|Year)', col, re.IGNORECASE)]

        # Identify closing balance columns
        closing_balance_columns = [col for col in mapped_data.columns if re.search(r'\bCB\b|\bClosing Balance\b', col, re.IGNORECASE)]

        # Keep only the closing balance columns and the time columns
        relevant_columns = time_columns + closing_balance_columns

        return mapped_data[relevant_columns]

    def map_data(self, consolidated_data, mapping_data):
        """
        Map the consolidated data with the mapping data based on the account columns.
        """
        consolidated_account_col = self.mapping_config["consolidated_account_column"]
        mapping_account_col = self.mapping_config["mapping_account_column"]
        levels = self.mapping_config["levels"]

        mapping_columns = [mapping_account_col] + levels

        mapped_data = pd.merge(
            consolidated_data,
            mapping_data[mapping_columns],
            left_on=consolidated_account_col,
            right_on=mapping_account_col,
            how='left'
        )

        for level in levels:
            if f"{level}_mapping" in mapped_data.columns:
                mapped_data[level] = mapped_data[f"{level}_mapping"]
                mapped_data.drop(columns=[f"{level}_mapping"], inplace=True)

        mapped_data = self.remove_duplicate_columns(mapped_data)

        # -------- Check and handle 'Year' column abnormal values --------
        if 'Year' in mapped_data.columns:
            # Identify abnormal values (e.g., 'Unknown' or non-digit values)
            invalid_years = mapped_data['Year'].apply(lambda x: not str(x).isdigit() or int(x) < 1900 or int(x) > 2099)

            # If abnormal values found, delete the 'Year' column
            if invalid_years.any():
                mapped_data.drop(columns=['Year'], inplace=True)
                # raise ValueError("Abnormal values found in 'Year' column. Column has been removed.")

        
        # -------- NEW CODE FOR COLUMN REARRANGEMENT AND FILTERING --------

        # Identify all columns that match the "Level {suffix}" pattern
        level_columns = [col for col in mapped_data.columns if re.match(r'Level \d+', col)]
        
        # Ensure the accounts column is present
        account_column = consolidated_account_col
        
        # Filter out only the closing balance and relevant time columns (Month/Year)
        filtered_closing_data = self.filter_closing_balance_columns(mapped_data)

        # Rearrange columns: Levels first, then Accounts, followed by closing balance time columns
        relevant_columns = level_columns + [account_column] + list(filtered_closing_data.columns)

        # Return the rearranged and filtered data
        return mapped_data[relevant_columns]

    def generate_pivot_table(self, data, by='Year'):
        """
        Generate a pivot table with months or years as columns and hierarchical levels as rows.
        The pivot table will only be generated if the sheet names correspond to valid years.
        """
        levels = self.mapping_config['levels']
        
        # Ensure the required columns ('Year') are present and valid
        if by not in data.columns:
            return
            # raise ValueError(f"No '{by}' column found in data. Ensure the date data is available and correctly processed.")
        
        # Check if the 'Year' column contains valid years
        if not data[by].apply(lambda x: str(x).isdigit() and 1900 <= int(x) <= 2099).all():
            return
            # raise ValueError("Sheet names are not valid years. Pivot table generation skipped.")
        
        # Identify financial columns (numeric columns excluding levels and 'Year')
        financial_columns = data.select_dtypes(include=['number']).columns.difference(levels + [by])

        # Create the pivot table with levels as rows and years/months as columns
        pivot_table = pd.pivot_table(
            data,
            values=financial_columns,
            index=levels,  # Hierarchical index (rows)
            columns=by,    # Columns representing 'Year'
            aggfunc='sum',  # Sum the financial data
            fill_value=0    # Fill NaN values with 0
        )

        # Adjust the MultiIndex columns to display only the year
        pivot_table.columns = [f'{col[1]}' for col in pivot_table.columns]

        # Remove any remaining duplicate columns in pivot_table
        pivot_table = pivot_table.loc[:, ~pivot_table.columns.duplicated()]

        # Reset the index so that Level 1, Level 2, etc., appear as normal columns
        if pivot_table:
            return pivot_table.reset_index()
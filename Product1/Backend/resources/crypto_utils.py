from base64 import b64encode, b64decode
from Crypto.Cipher import DES

ENCRYPT_KEY = "!@#$%^EncryptDecrypt^%$#@!"
BY_KEY = ENCRYPT_KEY[:8].encode('utf-8')
IV = bytes([18, 52, 86, 120, 144, 171, 205, 239])

def encrypt(plain_text):
    try:
        # Ensure the plain text is a multiple of the block size by adding padding
        padding_length = DES.block_size - (len(plain_text) % DES.block_size)
        padded_text = plain_text + chr(padding_length) * padding_length
        
        # Convert to bytes
        input_bytes = padded_text.encode('utf-8')
        
        # Create the cipher object and encrypt the data
        des = DES.new(BY_KEY, DES.MODE_CBC, IV)
        encrypted_bytes = des.encrypt(input_bytes)
        
        # Encode the encrypted bytes to base64
        encrypted_text = b64encode(encrypted_bytes).decode('utf-8')
        
        return encrypted_text
    except Exception as ex:
        return ""

def decrypt(encrypted_text):
    try:
        if encrypted_text != "System.Web.HttpCookie":
            encrypted_text = encrypted_text.replace(" ", "+")
            
            # Decode the base64 string
            encrypted_bytes = b64decode(encrypted_text.replace(" ", "+"))

            # Create the cipher object and decrypt the data
            des = DES.new(BY_KEY, DES.MODE_CBC, IV)
            decrypted_bytes = des.decrypt(encrypted_bytes)

            # Remove padding
            unpadded_bytes = decrypted_bytes[:-decrypted_bytes[-1]]

            return unpadded_bytes.decode('utf-8')
        else:
            return "Error when decrypt"
    except Exception as ex:
        return ""
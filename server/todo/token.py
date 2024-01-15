import secrets


def generate_email_verification_token():
    return secrets.token_hex(32)

from rest_framework.views import exception_handler
from rest_framework.exceptions import ValidationError
from rest_framework import status

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if isinstance(exc, ValidationError) and response is not None:
        response.status_code = status.HTTP_422_UNPROCESSABLE_ENTITY
        # Standardize detail schema
        if isinstance(response.data, dict):
            detail_msgs = []
            for field, msgs in response.data.items():
                if isinstance(msgs, list):
                    msg_str = " ".join([str(m) for m in msgs])
                else:
                    msg_str = str(msgs)
                detail_msgs.append(f"{field}: {msg_str}")
            response.data = {"detail": "; ".join(detail_msgs)}
        elif isinstance(response.data, list):
            response.data = {"detail": " ".join([str(m) for m in response.data])}

    return response

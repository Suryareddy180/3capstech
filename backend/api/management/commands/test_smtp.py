from django.core.management.base import BaseCommand
from django.core.mail import send_mail
from django.conf import settings
import sys

class Command(BaseCommand):
    help = "Test SMTP email configuration by sending a test email."

    def add_arguments(self, parser):
        parser.add_argument(
            "--to",
            type=str,
            default=getattr(settings, "CONTACT_NOTIFICATION_EMAIL", "md.3capstech@gmail.com"),
            help="Recipient email address (defaults to CONTACT_NOTIFICATION_EMAIL)",
        )

    def handle(self, *args, **options):
        recipient = options["to"]
        self.stdout.write(self.style.NOTICE("Testing SMTP Configuration..."))
        self.stdout.write(f"EMAIL_HOST: {settings.EMAIL_HOST}")
        self.stdout.write(f"EMAIL_PORT: {settings.EMAIL_PORT}")
        self.stdout.write(f"EMAIL_USE_TLS: {settings.EMAIL_USE_TLS}")
        self.stdout.write(f"EMAIL_HOST_USER: {settings.EMAIL_HOST_USER}")
        has_password = bool(settings.EMAIL_HOST_PASSWORD)
        self.stdout.write(f"EMAIL_HOST_PASSWORD set: {'Yes' if has_password else 'No (EMPTY)'}")

        if not has_password:
            self.stdout.write(
                self.style.WARNING(
                    "\n[WARNING] EMAIL_HOST_PASSWORD is empty in backend/.env!\n"
                    "For Gmail SMTP, please generate a 16-character Google App Password at:\n"
                    "https://myaccount.google.com/apppasswords\n"
                    "and set EMAIL_HOST_PASSWORD in backend/.env.\n"
                )
            )

        self.stdout.write(f"\nAttempting to send test email to {recipient}...")
        try:
            sent = send_mail(
                subject="3CAPSTECH SMTP Test Email",
                message=(
                    "Hello,\n\n"
                    "This is a test email from your 3CAPSTECH website backend to confirm that "
                    "Gmail SMTP is configured and working properly!\n\n"
                    "Best regards,\n"
                    "3CAPSTECH System\n"
                ),
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[recipient],
                fail_silently=False,
            )
            if sent:
                self.stdout.write(self.style.SUCCESS(f"\n[SUCCESS] Test email successfully sent to {recipient}!"))
            else:
                self.stdout.write(self.style.WARNING("\n[INFO] send_mail returned 0 (no email sent)."))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"\n[ERROR] SMTP test failed: {e}"))
            if "Username and Password not accepted" in str(e) or "BadCredentials" in str(e):
                self.stdout.write(
                    self.style.WARNING(
                        "\nTip: Google requires a 16-character App Password when 2FA is active.\n"
                        "1. Visit https://myaccount.google.com/apppasswords\n"
                        "2. Generate an App Password for '3CAPSTECH Website'\n"
                        "3. Set EMAIL_HOST_PASSWORD in backend/.env\n"
                    )
                )

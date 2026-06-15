import os
import smtplib

from email.message import EmailMessage

from dotenv import load_dotenv

from flask import (
    Flask,
    render_template,
    request,
    redirect,
    flash
)

load_dotenv()

app = Flask(__name__)

app.secret_key = os.getenv("SECRET_KEY")

def send_email(subject,
               body):

    gmail_user = os.getenv(
        "GMAIL_USER"
    )

    gmail_password = os.getenv(
        "GMAIL_APP_PASSWORD"
    )

    msg = EmailMessage()

    msg["Subject"] = subject

    msg["From"] = gmail_user

    msg["To"] = gmail_user

    msg.set_content(body)

    try:

        with smtplib.SMTP_SSL(
            "smtp.gmail.com",
            465
        ) as smtp:

            smtp.login(
                gmail_user,
                gmail_password
            )

            smtp.send_message(msg)

        return True

    except Exception as e:

        print("EMAIL ERROR:", e)

        return False

@app.route(
    "/send-contact",
    methods=["POST"]
)
def send_contact():

    name = request.form.get(
        "name"
    )

    email = request.form.get(
        "email"
    )

    phone = request.form.get(
        "phone"
    )

    message = request.form.get(
        "message"
    )

    body = f"""
New enquiry received.

Name:
{name}

Email:
{email}

Phone:
{phone}

Message:
{message}
"""

    success = send_email(

        subject=
        f"VASYNTIQ Contact - {name}",

        body=body

    )

    if success:

        flash(
            "Message sent successfully!"
        )

    else:

        flash(
            "Unable to send message."
        )

    return redirect("/")

@app.route("/")
def home():
    return render_template("home.html",
                           title="Home")
@app.route("/about")
def about():
    return render_template("about.html",
                           title="About")


@app.route("/services")
def services():
    return render_template("services.html",
                           title="Services")


@app.route("/portfolio")
def portfolio():
    return render_template("portfolio.html",
                           title="Portfolio")


@app.route("/careers")
def careers():
    return render_template("careers.html",
                           title="Careers")


@app.route("/contact")
def contact():
    return render_template("contact.html",
                           title="Contact")


if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)
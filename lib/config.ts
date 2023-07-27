import * as dotenv from 'dotenv';
import * as path from 'path';

if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path : path.resolve('.', '.env.spec') });
} else {
  dotenv.config();
}
dotenv.load();

class Config {
  DB_PATH: string;
  PORT: string;
  CRON_PORT: string;
  HOST: string;
  JWT_SECRET: string;
  NODE_ENV: string;
  TWILIO_NUMBER: string;
  TWILIO_ACCOUNTSID: string;
  TWILIO_AUTHTOKEN: string;
  STRIPE_SECRET_KEY: string;
  STRIPE_ACCOUNT_ID: string;
  STRIPE_WEBHOOK_SECRET: string;
  STRIPE_PRICEID: string;
  CONTACT_FORM_TARGET: string;
  MAILCHIMP_KEY: string;
  MAILCHIMP_LIST_ID: string;
  SENDGRID_API_KEY: string;
  SENDGRID_USER_EMAIL: string;
  SENDGRID_TEST_EMAIL: string;
  UPLOAD_PATH_FRONTEND_BUILD: string;
  SFTP_HOST: string;
  SFTP_PORT: string;
  SFTP_USERNAME: string;
  SFTP_PASSWORD: string;
  SSH_KEY_Path: string;
  S3_USER_KEY: string;
  S3_USER_SECRET: string;
  S3_BUCKET_NAME: string;
  S3_BUCKET_REGION: string;
  AWS_LOG_GROUP_NAME:string;
  GOOGLE_VERIFY_OAUTH_URL: string;
  FACEBOOK_VERIFY_OAUTH_URL: string;
  MICROSOFT_VERIFY_OAUTH_URL: string;
  JW_API_KEY: string;
  JW_API_SECRET: string;
  FIREBASE_ADMIN_TYPE: string;
  FIREBASE_ADMIN_PROJECT_ID: string;
  FIREBASE_ADMIN_PRIVATE_KEY_ID: string;
  FIREBASE_ADMIN_CLIENT_EMAIL: string;
  FIREBASE_ADMIN_CLIENT_ID: string;
  FIREBASE_ADMIN_AUTH_URI: string;
  FIREBASE_ADMIN_TOKEN_URI: string;
  FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL: string;
  FIREBASE_ADMIN_CLIENT_X509_CERT_URL: string;
  FIREBASE_ADMIN_PRIVATE_KEY: string;
  FIREBASE_USER_API_KEY: string;
  FIREBASE_USER_AUTH_DOMAIN: string;
  FIREBASE_USER_PROJECT_ID: string;
  FIREBASE_USER_STROAGE_BUCKET: string;
  FIREBASE_USER_MESSAGING_SENDER_ID: string;
  FIREBASE_USER_APP_ID: string;
  FIREBASE_EMULATOR_AUTH_PORT: string;
  APPLE_CLIENT_ID: string;
  APPLE_CLIENT_ID_IOS: string;
  BACKUP_PATH: string;
  LOCAL_DB_FILE: string;
  SLACK_WEBHOOK_FOR_LOGS: string;

  constructor() {
    this.DB_PATH = process.env.DB_PATH;
    this.PORT = process.env.PORT;
    this.CRON_PORT = process.env.CRON_PORT;
    this.HOST = process.env.HOST;
    this.JWT_SECRET = process.env.JWT_SECRET;
    this.NODE_ENV = process.env.NODE_ENV;
    this.TWILIO_NUMBER = process.env.TWILIO_NUMBER;
    this.TWILIO_ACCOUNTSID = process.env.TWILIO_ACCOUNTSID;
    this.TWILIO_AUTHTOKEN = process.env.TWILIO_AUTHTOKEN;
    this.STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
    this.STRIPE_PRICEID = process.env.STRIPE_PRICEID;
    this.STRIPE_ACCOUNT_ID = process.env.STRIPE_ACCOUNT_ID;
    this.STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
    this.CONTACT_FORM_TARGET = process.env.CONTACT_FORM_TARGET;
    this.MAILCHIMP_KEY = process.env.MAILCHIMP_KEY;
    this.MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
    this.SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    this.SENDGRID_USER_EMAIL = process.env.SENDGRID_USER_EMAIL;
    this.SENDGRID_TEST_EMAIL = process.env.SENDGRID_TEST_EMAIL;
    this.UPLOAD_PATH_FRONTEND_BUILD = process.env.UPLOAD_PATH_FRONTEND_BUILD;
    this.SFTP_HOST = process.env.SFTP_HOST;
    this.SFTP_PORT = process.env.SFTP_PORT;
    this.SFTP_USERNAME = process.env.SFTP_USERNAME;
    this.SFTP_PASSWORD = process.env.SFTP_PASSWORD;
    this.SSH_KEY_Path = process.env.SSH_KEY_Path;
    this.S3_USER_KEY = process.env.S3_USER_KEY;
    this.S3_USER_SECRET = process.env.S3_USER_SECRET;
    this.S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;
    this.S3_BUCKET_REGION = process.env.S3_BUCKET_REGION;
    this.AWS_LOG_GROUP_NAME=process.env.AWS_LOG_GROUP_NAME;
    this.GOOGLE_VERIFY_OAUTH_URL = process.env.GOOGLE_VERIFY_OAUTH_URL;
    this.FACEBOOK_VERIFY_OAUTH_URL = process.env.FACEBOOK_VERIFY_OAUTH_URL;
    this.MICROSOFT_VERIFY_OAUTH_URL = process.env.MICROSOFT_VERIFY_OAUTH_URL;
    this.JW_API_KEY = process.env.JW_API_KEY;
    this.JW_API_SECRET = process.env.JW_API_SECRET;
    this.FIREBASE_ADMIN_TYPE = process.env.FIREBASE_ADMIN_TYPE;
    this.FIREBASE_ADMIN_PROJECT_ID = process.env.FIREBASE_ADMIN_PROJECT_ID;
    this.FIREBASE_ADMIN_PRIVATE_KEY_ID = process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID;
    this.FIREBASE_ADMIN_CLIENT_EMAIL = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
    this.FIREBASE_ADMIN_CLIENT_ID = process.env.FIREBASE_ADMIN_CLIENT_ID;
    this.FIREBASE_ADMIN_AUTH_URI = process.env.FIREBASE_ADMIN_AUTH_URI;
    this.FIREBASE_ADMIN_TOKEN_URI = process.env.FIREBASE_ADMIN_TOKEN_URI;
    this.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL = process.env.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL;
    this.FIREBASE_ADMIN_CLIENT_X509_CERT_URL = process.env.FIREBASE_ADMIN_CLIENT_X509_CERT_URL;
    this.FIREBASE_ADMIN_PRIVATE_KEY = process.env.FIREBASE_ADMIN_PRIVATE_KEY;
    this.FIREBASE_USER_API_KEY = process.env.FIREBASE_USER_API_KEY;
    this.FIREBASE_USER_AUTH_DOMAIN = `${process.env.FIREBASE_ADMIN_PROJECT_ID}.firebaseapp.com`;
    this.FIREBASE_USER_PROJECT_ID = process.env.FIREBASE_ADMIN_PROJECT_ID;
    this.FIREBASE_USER_STROAGE_BUCKET = `${process.env.FIREBASE_ADMIN_PROJECT_ID}.appspot.com`;
    this.FIREBASE_USER_MESSAGING_SENDER_ID = process.env.FIREBASE_USER_MESSAGING_SENDER_ID;
    this.FIREBASE_USER_APP_ID = process.env.FIREBASE_USER_APP_ID;
    this.FIREBASE_EMULATOR_AUTH_PORT = process.env.FIREBASE_EMULATOR_AUTH_PORT;
    this.APPLE_CLIENT_ID = process.env.APPLE_CLIENT_ID;
    this.APPLE_CLIENT_ID_IOS = process.env.APPLE_CLIENT_ID_IOS;
    this.BACKUP_PATH = process.env.BACKUP_PATH;
    this.LOCAL_DB_FILE = process.env.LOCAL_DB_FILE;
    this.SLACK_WEBHOOK_FOR_LOGS = process.env.SLACK_WEBHOOK_FOR_LOGS;
  }
}

export const config = new Config();
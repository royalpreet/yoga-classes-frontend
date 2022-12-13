
# Yoga Classes

The frontend of the app is built using ReactJS.<br>
It is hosted on Netlify: https://wondrous-druid-63f9d8.netlify.app

<b>Note:</b> The app might run slow as the server where backend is hosted is slow. The backend server is spun down after 15 minutes of inactivity. When a new request comes in, it spins up again. This can cause a response delay of up to 30 seconds for the first request that comes in after a period of inactivity. So, you might have to wait for 30 seconds after you hit the Register button.


## Application Features

- User can sign up using email and password and then login into his/her account.
- On the home page, user will be asked to enroll if not already where he/she will be able to select time slot and then pay fee.
- If already enrolled, user will be able to see the end date of their subscription on the home page as well as their time slot.

## Other important points
- The app might run slow as the server where backend is hosted is slow. It works fine on local.
- Though authentication was not mentioned in the assignment, it is included because a user will be able to make payment only after he/she is logged in.
- Password is stored into the the database after encryption.
- Email is not being verified.
- User will be able to change time slot next month while paying fee.
- When we click on  Pay Fees button, it is assumed that the fees is paid since it is mentioned in the requirements that we should assume that we have a mock function named which does the payment for us.

## Screenshots of the app

![3](https://user-images.githubusercontent.com/54669961/207129059-d14ec9fd-cf8c-4ed2-9ccf-1c9d9399de45.PNG)
![4](https://user-images.githubusercontent.com/54669961/207129101-767aee17-3a0a-448f-9869-483489c97a86.PNG)
![1](https://user-images.githubusercontent.com/54669961/207129118-3bf5794f-7c81-417f-af9e-2894aaa9d357.PNG)
![2](https://user-images.githubusercontent.com/54669961/207129137-a43fbbc2-4f89-44ca-9935-0c03318aa904.PNG)

## 
To run this project locally -

Clone the project

```bash
  git clone https://github.com/royalpreet/yoga-classes-frontend.git
```

Go to the project directory

```bash
  cd yoga-classes-frontend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

  

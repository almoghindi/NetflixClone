# Netflix Clone
The Netflix clone project is a streaming platform with secure user authentication, multiple profiles per account, integrated payment processing, real-time movie updates and AI based recommendations. It delivers high-quality content and constantly refreshes its library to provide the latest films and shows.
The platform is built in microservices architecture, ensure scalability and maintainability.

## Overview

### Core Features
- **User Authentication**: Secure user registration, login, logout and reseting password.
- **Multiple Profiles**: Each user can contain up to 5 profiles. 
- **Payment Processing**: Several different payment methods.
- **Video Streaming**: Custom streamer with the ability to change qualities.
- **AI Based Recommenations**: Movie recommendations based AI by profile.
  
### Technologies Used
- **Front End**: React, TypeScript
- **Back End**: Node.js, Express, TypeScript
- **Data Base**: MongoDB, MySQL
- **Caching**: Redis
- **Cloud**: AWS
- **Event Streaming**: Apache Kafka
- **Containerization**: Docker
- **AI**: Groq (Llama)
- **Streaming**: HLS 
- **State Management**: Redux
- **Styling**: TailWind, CSS
- **Authentication**: JWT, bcrypt, crypto, twilio 
- **Payment Processing**: Stripe, PayPal 
- **Testing**: Jest, SuperTest 


### Micoservices Architecture
Microservices architecture divides the application into independent services like authentication, payment, and streaming, communicating via APIs for scalability and flexibility.

### Streaming
The streaming service uses HLS to split the master file into segments, which are uploaded to AWS S3, allowing dynamic quality adjustments based on the master file. This ensures smooth playback with adaptive streaming across different network conditions.

### AI Recommendations
recommendations are powered by Groq, processing user activity in real-time to deliver personalized content suggestions, enhancing user engagement and experience on the platform.

### Code Reuse with npm Package
To enhance code reuse and maintain consistency across the microservices, common utilities, types, and shared logic are encapsulated in a private npm package (@netflix-adea/common). This package is used across different services within the platform to ensure a modular and DRY (Don't Repeat Yourself) approach, making the development process more efficient and the codebase easier to maintain.

## Media

#### Home Page
![image](https://github.com/user-attachments/assets/cecec88a-896b-4504-b558-a126bae3d104)

#### Payment
![image](https://github.com/user-attachments/assets/8d877774-16dd-4f5f-9322-ea6438ae6540)

#### Profiles
![image](https://github.com/user-attachments/assets/72884783-788f-4bd5-bd90-869898734671)

#### Tv Shows
![image](https://github.com/user-attachments/assets/18afa5de-76ce-4c1b-a105-20d62550dff9)



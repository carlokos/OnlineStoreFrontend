# Online Store Fronted
Project created at JavaSchool 2023, this repository saves the web app from my final project, which is OnlineStore. I use React for web development and mostly MaterialUI for the interface to make it responsive. 

# How to deploy
Before deploying, ensure you've downloaded both this repository and the **frontend** repository: [OnlineStoreFrontend](https://github.com/carlokos/OnlineStoreFrontend.git). 

Once you have both repositories on your machine, organize the directories correctly according to the `docker-compose.yml`. Please check the provided `docker-compose.yml` for guidance
```
- Backend
-- Backend-files
- Any name
-- Frontend
---- Frontend-files
```

# How to use it

After setting up, run the following command: `docker-compose up`. No need to build any app since both repositories come with their respective builds. 
- Backend runs on port 8080.
- Frontend runs on port 5173.

Access the web app at [localhost:5173](http://localhost:5173) and start exploring. The database includes an admin user: 
- Email: admin@admin.com 
- Password: root 

Hope you enjoy navigating through my OnlineStore!

# Characteristics
- User-friendly interfaces easy to use
- Real time updates with cart and orders
- Persistent cart even closing the web
- User can sign in, log in and change its information
- Admin privileges 
- Stastistics to compare sales
- All in a docker container to easy use




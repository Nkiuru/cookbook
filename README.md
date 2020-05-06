# cookbook

GraphQL api & client for storing & organizing and finding recipes. 

## Features
- Create, edit, delete, clone recipe
- Create, edit, delete lists
- Add recipe review & delete review
- Add rating to recipe, update recipe rating
- Search for recipes by: keyword which queries ingredients, title, description, instructions (client).
- Get recipes by Tag, Category, User, List

## Project Info

- [**Project Board**](https://github.com/Nkiuru/cookbook/projects/1)
- [**Weekly Milestones**](https://github.com/Nkiuru/cookbook/milestones)
- [**UI Prototype**](https://www.figma.com/file/zgVdmT8zHhfXmOtPzq7Inw/cookbook?node-id=0%3A1)

## Build Instructions

### **Server**
#### Development build
**.env file contents:**
```
PORT=3000
DB_URL=SET_ME
JWT_SECRET=SET_ME
JWT_LIFE_TIME=7d
WORKERS=1
NODE_ENV= development || production
SSL_KEY=SET ME
SSL_CERT=SET ME
```

Navigate to `server` directory and run `npm i`

Running development server `npm run dev`

#### Production build
Set `NODE_ENV` to 'production' set paths to `SLL_KEY` & `SSL_CERT`.

### **Frontend** 
Navigate to `front-end` directory and run `npm i`

To run in localhost `npm start`

To make a production build `npm run build`

All features require authentication on the frontend but some api queries work without as well.

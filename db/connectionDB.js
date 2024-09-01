import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('mysql://ummcufukmmjhdkyu:WIb7AA1zhBIG6gEDxrhw@bvlsx7jxw6kzvcueqrz9-mysql.services.clever-cloud.com:3306/bvlsx7jxw6kzvcueqrz9');


//to make sure the connection is working
  const connectionDB = async () => {
    return await sequelize.sync( {alter: false, force: false}).then(()=> {
        console.log("Connection database initialized successfully")
    }).catch(err => {
        console.log({msg: "Connection database failed" , err})
    })

  }

   export default connectionDB
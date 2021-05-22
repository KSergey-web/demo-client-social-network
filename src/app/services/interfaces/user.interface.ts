export enum userStatusEnum {
    online='online',
    offline='offline'
}

export interface User {  

    _id: string;

    email: string;
    
    name: string;
    
    surname: string;
    
     patronymic: string;
    
    //  gender: string;
    
      birthdate: Date;
    
      avatar?: string;
    
      telephone: string;
    
     login: string;

     status?: userStatusEnum; 
}


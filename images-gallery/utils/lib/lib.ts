import crypto from "crypto";

export const verifyPassword = (password : string, userPassword : string, salt : string) => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 10000, 64, "sha1", (err, key) => {
      if (err) {
        reject(false);
      } else {
        const encryptedPassword = key.toString("base64");
        console.log(encryptedPassword)
        if (userPassword === encryptedPassword) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    });
  });
}

export function encryptPass(password : string){
  return new Promise((resolve, reject) => {
    crypto.randomBytes(16, (err, salt) => {
      if(err) reject(err);
		  const newSalt = salt.toString('base64');
		  crypto.pbkdf2(password, newSalt, 10000, 64, 'sha1', (err, key) => {
        if(err){ 
          reject(err);
        }else{
          const encryptedPassword = key.toString('base64')
		      resolve({encryptedPassword, newSalt})
        }
			});
		});
	});
}

/* export function generateSalt() {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(16, (err, salt) => {
      if (err) {
        reject(err);
      } else {
        const newSalt = salt.toString('base64');
        resolve(newSalt);
      }
    });
  });
}

export function getBase64(file : any){
    return new Promise(resolve => {
      let baseURL : any = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  } */

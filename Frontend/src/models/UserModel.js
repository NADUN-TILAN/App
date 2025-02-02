export class UserModel {
    constructor(userID, firstName, middleName, lastName, dob, address, country, contactNo, email, createdDate) {
        this.userID = userID;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.dob = dob;
        this.address = address;
        this.country = country;
        this.contactNo = contactNo;
        this.email = email;
        this.createdDate = createdDate;
    }
}

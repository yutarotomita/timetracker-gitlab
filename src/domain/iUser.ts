export interface IUser{
    id :number
    userName :string
    label :string
    imgPath :string
    profilePath :string
    
    getId():number
	getUserName() :string
	getLabel() :string
    getImgPath() :string
    getProfilePath() :string
}
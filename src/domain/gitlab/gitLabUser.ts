import { IUser } from "../iUser"

// ユーザー1名を表すクラス
export class GitLabUser implements IUser{
    id :number
    userName :string
    label :string
    imgPath :string
    profilePath :string

	constructor(user: any){
		this.id = user.id
		this.userName = user.username
		this.label = user.name
        this.imgPath = user.avatar_url
		this.profilePath = user.web_url
	}

	getId(){
		return this.id
	}

	getUserName(){
		return this.userName
	}

	getLabel(){
		return this.label
	}

    getImgPath(){
        return this.imgPath
    }

    getProfilePath(){
        return this.profilePath
    }
}
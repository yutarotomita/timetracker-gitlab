// ユーザーリストのクラス
// 現状使ってない
class UserList{
	constructor(){
		this.users = []
		this.eventSelectBoxChange = () =>{}
	}

	/**
	 * ユーザーリストのセット
	 * @param {Array[User]} users 
	 */
	set(users){
		this.users = []
		let pushedUserIds = []
		users.forEach((user)=>{
			if(user != null){
				const isPushed = (pushedUserIds.find(pushedId => pushedId == user.getId()) != null)
				// 重複ユーザーを省いてpush
				if(!isPushed){
					this.users.push(user)
					pushedUserIds.push(user.getId())
				}
			}
		})
	}

	/**
	 * ユーザーリストのゲッター
	 * @returns {Array[User]}
	 */
	getAll(){
		return this.users
	}

	// idに応じたユーザーを返却
	getById(id){
		// Array.find()だと上手くいかなかった...なぜ
		for(let i= 0; i< this.users.length; i++){
			if(this.users[i].getId() == id){
				return this.users[i]
			}
		}
		return null
	}

	// indexに応じたユーザーを返却
	getByIndex(index){
		return this.users[index]
	}

	// 任意のユーザーが居るか判定
	hasUser(id){
		const targetIndex = this.users.find(user =>user.getId()==id)
		return targetIndex ? true : false
	}
}
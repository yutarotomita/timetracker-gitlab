import { IUser } from "./iUser"
export interface IIssue{
    id :number //FIXME: stringのがいい
    assignee :IUser | undefined
    title :string
    timeEstimate :number //FIXME: RelativeTimeのがいい
    timeSpend :number //FIXME: RelativeTimeのがいい
    // good :number
    // bad :number
    labels :Array<string>
    state :string
    url :string

    getId() :number
    getAssignee() :IUser | undefined
    getTitle() :string
    isAssign() :boolean
    getLabels() :Array<string>
    isActive() :boolean
    getTimeEstimate() :number
    getTimeSpend() :number
    // getGood() 
}
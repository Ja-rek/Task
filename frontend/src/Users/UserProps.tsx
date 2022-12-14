export interface User {
  id: number
  firstName: string
  lastName: string
  streetName: string
  houseNumber: string
  apartmentNumber?: number
  postalCode: string
  town: string
  phoneNumber: number
  dateOfBirth: Date
  age:number 
  isUnSaved: boolean 
}

export interface UsersGridProps{
  users: User[]
  loading: boolean
  error: boolean
  handleSave: () => void,
  handleCancel: () => void,
  handleOpenEdit: (event: React.MouseEvent<HTMLButtonElement>, user: User) => void,
  handleDelete: (id: number) => void,
}

export interface UsersFormProps{
  user: User | undefined
  handleSend: (user: User) => void,
  title: string
  buttonText: string
}
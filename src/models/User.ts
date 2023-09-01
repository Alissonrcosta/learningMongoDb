import { Schema, connection, model, Model } from "mongoose";
// criar types do nosso model especifico(types com a mesma estrutura para todos os usuários).
type UserType = {
    name: {
        firstName:string,
        lastName: string
    },
    email: string,
    interests: string[]
    age: number
}
// types Criar o Schema, ele é um type especifico para Mongo(lib Mongoose) quem é campo obrigatoria, quem tem que guardar numero ou não quem tem valor padrão.
const schema = new Schema<UserType>({
    name: {
        firstName:{type: String, required: true},
        lastName:String
    },
    email: {type:String, required: true}, 
    interests: [String],
    age: {type: Number, required: true}
});

const modelName: string = 'User';
//verificação se tenho conexão e se essa conexão tem models com modelName e pego o proprio model, caso não tenha criado eu crio esse model.
export default (connection && connection.models[modelName]) ? connection && connection.models[modelName] as Model<UserType> : model<UserType>(modelName, schema)



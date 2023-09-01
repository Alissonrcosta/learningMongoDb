import { Request, Response } from 'express';
import User from '../models/User';

//Adicionando um usuário no Banco
export const addUserAction = async (req: Request, res: Response)=>{
    let {firstName, lastName, email, interests, age } = req.body;
    let newUser = new User();
    newUser.name = { firstName, lastName };
    newUser.name.lastName = lastName;
    newUser.email = email;
    newUser.interests = interests.split(',');
    newUser.age = age;

    try {
        await newUser.save();
        res.redirect('/');
    } catch (error) {
        console.error('Erro ao adicionar usuário:', error);
        res.status(500).send('Erro ao adicionar usuário');
    }
};

//adicionar +1 ano de vida
export const addIdade = async (req: Request, res: Response)=>{

    let id: string = req.params.id;
    
    let results = await User.findById(id);
    if(results){
        results.age++
        results.save();
    }else{
        console.log('usuário não encontrado');
    }


    res.redirect('/');
}

//deletar usuário

export const removeUserAction = async (req: Request, res: Response)=>{
    let id: string = req.params.id;
    await User.findOneAndDelete({_id: id});
    res.redirect('/');
    
}

export const editUser = async (req: Request, res: Response)=>{

    let id: string = req.params.id;
    
    let results = await User.findById(id);
    
    res.render('pages/editar', {
        id,
        results
    });
};

export const updateUser = async (req: Request, res: Response)=>{
    const userId = req.params.id;
    let {firstName, lastName, email, interests, age } = req.body;
    
    try {
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          {
            'name.firstName': firstName,
            'name.lastName': lastName,
            email: email,
            interests: interests.split(','),
            age
          },
          { new: true } // Isso garante que o método retorne o documento atualizado
        );
    
        if (!updatedUser) {
          return res.status(404).send('Usuário não encontrado');
        }
    
        res.redirect('/');
      } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).send('Erro ao atualizar usuário');
      }
    };


export const home = async (req: Request, res: Response)=>{
    
    let users = await User.find({}).sort({name: 1})
     res.render('pages/home', {
        users
    })
};

const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json())





//mysql
const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            :'root',
    password        :'',
    database        :'jobsmartindia' 
})

//Get all data of table
app.get('', (req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        //query(sqlString, callback)
        connection.query('SELECT * from candidates',(err,rows)=>{
            connection.release()  // return the connection to pool

            if(!err){
                res.send(rows)
            } else{
                console.log(err)
            }
        })    
        
    })
})


//Get all beers by ID
app.get('/:id', (req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        //query(sqlString, callback)
        connection.query('SELECT * from candidates WHERE id=?', [req.params.id], (err,rows)=>{
            connection.release()  // return the connection to pool

            if(!err){
                res.send(rows)
            } else{
                console.log(err)
            }
        })   

        
    })
}) 



//Delete a records 
app.delete('/:id', (req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        //query(sqlString, callback)
        connection.query('DELETE from candidates WHERE id=?', [req.params.id], (err,rows)=>{
            connection.release()  // return the connection to pool

            if(!err){
                res.send(`beer with the Record ID ${[req.params.id]} has been removed.`)
            } else{
                console.log(err)
            }
        })    
        
    })
}) 

//Add a records 
app.post('', (req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const params = req.body
       connection.query('INSERT INTO candidates SET ?', params, (err,rows)=>{
            connection.release()  // return the connection to pool

            if(!err){
                res.send(`beer with the name: ${params.first_name} has been Added.`)    
            } else{
                console.log(err)
            }
        })    
        
        console.log(req.body)
        
    })
}) 


//Update a records 
app.put('', (req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        const {id, first_name, last_name, phone, dob, email_id, curr_state, curr_city, curr_area, pref_state, pref_city,
             pref_area,gender, work_exp, curr_annual_salary, curr_job_title, curr_functional_area, curr_industry,
            years_cjobs, education, resume_file, created_at, updated_at, createdAt, updatedAt } = req.body

    
        connection.query('UPDATE candidates SET first_name = ?, last_name = ?, phone = ?, dob = ?, email_id = ?, curr_state = ?, curr_city = ?, curr_area = ?, pref_state = ?, pref_city = ?, pref_area = ?,  gender = ?, work_exp = ?, curr_annual_salary = ?, curr_job_title = ?, 	curr_functional_area = ?,curr_industry = ?, years_cjobs = ?, education = ?, resume_file = ?, created_at = ?, updated_at = ?,createdAt = ?, updatedAt = ?  WHERE id = ?',
        [first_name, last_name, phone, dob, email_id,
        curr_state, curr_city, curr_area, pref_state, pref_city, pref_area, gender, work_exp, curr_annual_salary,
        curr_job_title, curr_functional_area, curr_industry,years_cjobs, education, resume_file, created_at, updated_at,
        createdAt, updatedAt ,id] , (err,rows)=>{
            connection.release()  // return the connection to pool

            if(!err){
                res.send(`beer with the name: ${first_name} has been Added.`)
            } else{
                console.log(err)
            }
        })    
        
       // console.log(req.body)
        
    })
}) 







app.listen(port,()=>{
    console.log(`listen on Port no ${port}`)
})

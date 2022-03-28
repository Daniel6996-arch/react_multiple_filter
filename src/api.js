import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Input } from 'semantic-ui-react'
import './App.css'

function Posts() {
    const [APIData, setAPIData] = useState([])
    const [GITData, setGITData] = useState([])
    const [searchInput, setSearchInput]  = useState('')
    const [filteredResults, setFilteredResults] = useState([]);
    const searchValue1 = document.getElementsByClassName('api')
    const searchValue2 = document.getElementsByClassName('two')
    const searchItems = (searchValue2) =>{
            setSearchInput(searchValue2)
            if(searchInput !== ''){
                const filteredData = APIData.filter((item)=>{
                    return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
                })
                const filteredGit = GITData.filter((item)=>{
                    return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
                })
                setFilteredResults(filteredGit)
            }
            else{
                setFilteredResults(GITData)
            }
           
            console.log(searchValue1);
            console.log(searchValue2);
    }
    useEffect(() => {
        const fetchData = async () => {
          const respGlobal = await axios(`https://api.github.com/users`);
          const respUsers = await axios(`https://jsonplaceholder.typicode.com/users`);
    
          setGITData(respGlobal.data);
          setAPIData(respUsers.data);
        };
    
        fetchData()
    
      }, []);
    
      if (APIData) {
       // console.log(APIData, GITData);
      }

    return (
        <div className='input'>
            <div style={{ padding: 20 }}>
           <div className='input'>
           <Input icon='search'
                className='api'
                placeholder='Search...'
                onChange={(e)=>searchItems(e.target.value)}
            />
           </div>
            <Card.Group itemsPerRow={3} style={{ marginTop: 20 }}>
                {searchInput.length > 1 ? (
                    filteredResults.map((item)=>{
                        return(
                            <Card>
                               <Card.Content>
                                    <Card.Header>{item.name}</Card.Header>
                                    <Card.Description>
                                        {item.email}
                                    </Card.Description>
                                </Card.Content>  
                            </Card>
                        )
                    })
                ) : (
                    APIData.map((item) => {
                        return (
                            <div className='git'>
                                <Card>
                                <Card.Content className='content'>
                                    <Card.Header className='head'>{item.name}</Card.Header>
                                    <Card.Description className='body'>
                                        {item.email}
                                    </Card.Description>
                                </Card.Content>
                                </Card>
                            </div>
                        )
                    })
                )}
            </Card.Group>
        </div>
        <div style={{ padding: 20 }}>
           <div className='input'>
           <Input icon='search'
                className='two'
                placeholder='Search...'
                onChange={(e)=>searchItems(e.target.value)}
            />
           </div>
            <Card.Group itemsPerRow={3} style={{ marginTop: 20 }}>
                {searchInput.length > 1 ? (
                    filteredResults.map((item)=>{
                        return(
                            <Card>
                               <Card.Content>
                                    <Card.Header>{item.login}</Card.Header>
                                    <Card.Description>
                                        {item.id}
                                    </Card.Description>
                                </Card.Content>  
                            </Card>
                        )
                    })
                ) : (
                    GITData.map((item) => {
                        return (
                            <div className='git'>
                                <Card>
                                <Card.Content className='content'>
                                    <Card.Header className='head'>{item.login}</Card.Header>
                                    <Card.Description className='body'>
                                        {item.id}
                                    </Card.Description>
                                </Card.Content>
                                </Card>
                            </div>
                        )
                    })
                )}
            </Card.Group>
        </div>
        </div>
    )
}

export default Posts;
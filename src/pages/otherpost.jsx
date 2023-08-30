import React from "react";
import Logo from "../img/service.jpg"; 
import { Link } from "react-router-dom";

const Menu = ()=>{
    const messages = [
        {
          id: 1,
          primary: 'Brunch this week?',
          secondary: "I'll be in the neighbourhood this week. Let's grab a bite to eat",
          person: {Logo},
        },
        {
          id: 2,
          primary: 'Birthday Gift',
          secondary: `Do you have a suggestion for a good present for John on his work
            anniversary. I am really confused & would love your thoughts on it.`,
          person: {Logo},
        },
        {
          id: 3,
          primary: 'Recipe to try',
          secondary: 'I am try out this new BBQ recipe, I think this might be amazing',
          person: {Logo},
        },
        {
          id: 4,
          primary: 'Yes!',
          secondary: 'I have the tickets to the ReactConf for this year.',
          person: {Logo},
        },
        {
          id: 5,
          primary: "Doctor's Appointment",
          secondary: 'My appointment for the doctor was rescheduled for next Saturday.',
          person: {Logo},
        },
        {
          id: 6,
          primary: 'Discussion',
          secondary: `Menus that are generated by the bottom app bar (such as a bottom
            navigation drawer or overflow menu) open as bottom sheets at a higher elevation
            than the bar.`,
          person: {Logo},
        },
        {
          id: 7,
          primary: 'Summer BBQ',
          secondary: `Who wants to have a cookout this weekend? I just got some furniture
            for my backyard and would love to fire up the grill.`,
          person: {Logo},
        },
      ];
    return (
        <div className="menu">
           <h1>Other posts you may like</h1>
             {
                    messages.map((post) =>(
                        <div className="post" key={post.id}>
                            <div className="img">
                            <img src={ Logo} alt ="" />
                            </div>
                            <div className="content">
                                <Link className="link" to={`/single/${post.id}`}>
                                    <h2>{post.primary}</h2>  
                                </Link>
                                    <p>{post.secondary}</p>
                                    <Link to={`/single/${post.id}`}>
                                        <button>Read more ...</button>
                                    </Link>
                                    
                                
                               

                            </div>

                            </div>
                    ))
                }
        </div>
     
    )
}

export default Menu
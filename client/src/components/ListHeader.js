const ListHeader = ( { listName} ) => {
    const signOut = () => {
        console.log("signout");
    }

    return (
      <div>
        <h1>{ listName }</h1>
        <div className="button-container">
            <button className="create">Add Task</button>
            <button className="signout" onClick={signOut}>Sign Out</button>
        </div>
      </div>
    );
  };
  
  export default ListHeader;
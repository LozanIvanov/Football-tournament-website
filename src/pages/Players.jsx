import React, { useEffect, useState } from "react";
import withMainLayoutPage from "../layout/withMainLayoutPage";
import Table from "../components/Table";



function Players() {

    const style = {
        background: {
            background: "url('/images/header/stadium4.jpg')",
            backgroundPosition: 'center center',
            backgroundSize: 'cover ',
            backgroundRepeat: 'no-Repeat',
            height: '100%',
    
        }
    }

    const [players, setPlayers] = useState([]);
    const [player, setPlayer] = useState([]);
    const [teams, setTeams] = useState([]);

    function coach() {
        const germany = teams.find(team => team.Name === 'Germany');
        return germany ? germany.ManagerFullName : 'Manager not found';
    }

    useEffect(() => {

        fetch('/data/teams.csv')
            .then(response => {
                return response.text();
            })
            .then(response => {

                const rows = response.trim().split('\n');
                const headers = rows[0].split(',');

                const teamData = rows.slice(1)
                    .map(row => row.split(',').map(field => field.trim()))
                    .map(row => headers.reduce((acc, header, index) => {
                        acc[header] = row[index];
                        return acc;
                    }, {}));
                console.log(teamData)
                setTeams(teamData);
            })
    },
        []);

    useEffect(() => {
        fetch('/data/players.csv')
        .then(response =>
            response.text()
        )
        .then(response => {
            const rows = response.trim().split('\n');
        
            const headers = rows[0].split(',');
        
            const filterData = rows.slice(1)
                .map(row => row.split(',').map(field => field.trim()))
                .filter(row => row.length === headers.length && row[4] === '1')
                .map(x => {
                    return headers.reduce((acc, header, index) => {
                        acc[header] = x[index];
                        return acc;
                    }, {})
                });
            let data = filterData.map(item => [
                item.FullName, item.Position, item.TeamNumber]);
            setPlayers(data)
            setPlayer(filterData)
        })

    }, [])


    return (
        <>
            <div className="row" style={{ display: 'flex', boxSizing: 'border-box', height: '100%' }}>
    
                <div className="col-12" style={style.background} >
                   <div style={{width:'90%', display:'flex',justifyContent:'center',textAlign:'center',fontSize:'10px' }}>
                   <Table columns={["Full Name","Position","Team Number"]}
                   values={players}
                   />
                   </div>
                    
                </div>
            
            </div>
        </>
    )
}
export default withMainLayoutPage(Players);
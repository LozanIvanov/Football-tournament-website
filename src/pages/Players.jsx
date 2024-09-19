import React, { useEffect, useState } from "react";
import withMainLayoutPage from "../layout/withMainLayoutPage";
import Table from "../components/Table";
import { useParams } from "react-router-dom";



function Players() {

    const style = {
        background: {
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            background: "url('/images/header/stadium4.jpg')",
            backgroundPosition: 'center center',
            backgroundSize: 'cover ',
            backgroundRepeat: 'no-Repeat',
            height: '100%',

        },
        tableWrap:{
            marginTop:'40px',
            background:'white',
            width:'70%',
            maxHeight:'100%',
            overflowY:'auto',
            textAlign:'center',
            fontSize:'10px',

        }
    }
    const { country } = useParams()
    const [players, setPlayers] = useState([]);
    const [player, setPlayer] = useState([]);
    const [teams, setTeams] = useState(null);


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

                const selectedTeam = teamData.find(x => x.Name.toLowerCase() === country.toLowerCase());
                setTeams(selectedTeam.ID);
            })
    },
        [country]);

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
                    .filter(row => row.length === headers.length && row[4] === teams)
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

    }, [teams])


    return (
        <>
            <div className="row" style={{ display: 'flex', boxSizing: 'border-box', height: '100%' }}>

                <div className="col-lg-12 col-md-10 col-12  mx-auto" style={style.background} >
                    <div style={style.tableWrap }>
                        <Table columns={["Full Name", "Position", "Team Number"]}
                            values={players}
                        />
                    </div>

                </div>

            </div>
        </>
    )
}
export default withMainLayoutPage(Players);
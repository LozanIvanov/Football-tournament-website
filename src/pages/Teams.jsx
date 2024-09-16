import React, { useEffect, useState } from "react";
import withMainLayoutPage from "../layout/withMainLayoutPage";
import Card from "../components/Card";
import { useParams } from "react-router-dom";
import SidebarPage from "../components/SideBarPage";


function CountryPage() {

    const style = {
        background: {
            background: "url('/images/peatch2.jpg')",
            backgroundPosition: 'center center',
            backgroundSize: 'cover ',
            backgroundRepeat: 'no-Repeat',
            height: '100%',

        }
    }
    const { country } = useParams();
    const [teamId, setTeamID] = useState(null);
    const [teamData, setTeamData] = useState(null)
    const [player, setPlayer] = useState([]);
    const [teams, setTeams] = useState([]);

    function getCountryTeam() {
        const team = teams.find(team => team.Name.toLowerCase() === country.toLowerCase());

        return team ? team.ManagerFullName : 'Manager not found';
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

                setTeams(teamData);

                const selectedTeam = teamData.find(x => x.Name.toLowerCase() === country.toLowerCase());

                setTeamID(selectedTeam.ID);
                setTeamData(selectedTeam);
            })
    },
        [country]);

    useEffect(() => {
        fetch('/data/players.csv')
            .then(response => response.text()

            )
            .then(response => {

                const rows = response.trim().split('\n');


                const headers = rows[0].split(',');
                const currentTeam = teams.find(x => x.Name.toLowerCase() === country.toLowerCase());

                const filterData = rows.slice(1)
                    .map(row => row.split(',').map(field => field.trim()))
                    .filter(row => row.length === headers.length && row[4] === currentTeam.ID)

                    .map(x => {
                        return headers.reduce((acc, header, index) => {
                            acc[header] = x[index];
                            return acc;
                        }, {})
                    });


                setPlayer(filterData)

            })
    }, [teamId])


    function playerTitle(player) {

        if (player && player.FullName) {
            return player.FullName;
        }

    }
    function playerPosition(player) {
        if (player && player.Position) {
            return player.Position
        }
    }

    return (
        <>

            <div className="row" style={{ display: 'flex', boxSizing: 'border-box', height: '100%' }}>
                <div className="col-lg-7 col-md-6 col-12 mb-4 " style={style.background} >

                    <div style={{ width: '80px', height: '20px', fontSize: '10px' }} >

                        <div style={{ margin: '5px 0 0 330px', width: '100%' }}>
                            <Card title={playerTitle(player[0])} position={playerPosition(player[0])} bgColor={"bg-warning"} />
                        </div>

                        <div style={{ margin: '-20px 0 0 145px', width: '100%', fontSize: '9px' }}>
                            <Card title={playerTitle(player[1])} position={playerPosition(player[1])} />
                        </div>

                        <div style={{ margin: '-70px 0 0 510px', width: '100%' }}>
                            <Card title={playerTitle(player[2])} position={playerPosition(player[2])} />
                        </div>
                        <div style={{ margin: '15px 0 0 250px', width: '100%' }}>
                            <Card title={playerTitle(player[3])} position={playerPosition(player[3])} />
                        </div>
                        <div style={{ margin: '-70px 0 0 400px', width: '100%' }}>
                            <Card title={playerTitle(player[4])} position={playerPosition(player[4])} />
                        </div>
                        <div style={{ margin: '40px 0 0 140px', width: '100%', fontSize: '9px' }}>
                            <Card title={playerTitle(player[5])} position={playerPosition(player[5])} bgColor={"bg-success"} />
                        </div>
                        <div style={{ margin: '-70px 0 0 330px', width: '100%' }}>
                            <Card title={playerTitle(player[6])} position={playerPosition(player[6])} bgColor={"bg-success"} />
                        </div>
                        <div style={{ margin: '-70px 0 0 540px', width: '100%' }}>
                            <Card title={playerTitle(player[7])} position={playerPosition(player[7])} bgColor={"bg-success"} />
                        </div>
                        <div style={{ margin: '40px 0 0 330px', width: '100%' }}>
                            <Card title={playerTitle(player[8])} position={playerPosition(player[8])} bgColor={"bg-success"} />
                        </div>
                        <div style={{ margin: '20px 0 0 160px', width: '100%' }}>
                            <Card title={playerTitle(player[9])} position={playerPosition(player[9])} bgColor={"bg-danger"} />
                        </div>
                        <div style={{ margin: '-70px 0 0 490px', width: '100%' }}>
                            <Card title={playerTitle(player[10])} position={playerPosition(player[10])} bgColor={"bg-danger"} />
                        </div>
                    </div>

                </div>
                <div className="col-lg-5 col-md-6 col-12">
                    <div style={{
                        marginLeft: '-12px', width: '100%', height: '100%', fontSize: '30px', background: 'red', fontSize: '50px',
                        fontWeight: 'bold'
                    }}>
                        <div style={{ fontSize: '50px', textAlign: "center", padding: '20px' }}>
                            {country.toUpperCase()} COACH
                        </div>
                        <div>
                            <img src="./images/coach.webp" />
                        </div>
                        <div style={{ textAlign: "center" }}>
                            {getCountryTeam()}
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}
export default withMainLayoutPage(CountryPage);
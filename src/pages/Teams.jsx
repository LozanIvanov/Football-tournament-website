import React, { useEffect, useState } from "react";
import withMainLayoutPage from "../layout/withMainLayoutPage";
import Card from "../components/Card";
import { useParams } from "react-router-dom";



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
    const [mainTeam, setMainTeam] = useState([]);
    const [reserves, setReserves] = useState([]);

    console.log(reserves)


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

                const gk = filterData.filter(x => x.Position === 'GK').slice(0, 1);
                const df = filterData.filter(x => x.Position === 'DF').slice(0, 4);
                const mf = filterData.filter(x => x.Position === 'MF').slice(0, 3);
                const fw = filterData.filter(x => x.Position === 'FW').slice(0, 3);
        
                setMainTeam([...gk, ...df, ...mf, ...fw]);

                const mainteam=[...gk, ...df, ...mf, ...fw];

                const reserves=filterData.filter(x=>!mainteam.includes(x))
                setReserves(reserves)
           
                setPlayer(filterData)        

            })
    }, [teamId])

    function playerTitle(mainTeam) {

        if (mainTeam && mainTeam.FullName) {
            return mainTeam.FullName;
        }

    }
    function playerPosition(mainTeam) {
        if (mainTeam && mainTeam.Position) {
            return mainTeam.Position
        }
    }

    return (
        <>

            <div className="row" style={{ position: "relative", display: 'flex', boxSizing: 'border-box', height: '100%' }}>
                <div className="col-lg-7 col-md-6 col-12 mb-4 " style={style.background} >

                    <div className="pitch" style={{ position: "relative", width: '100%', height: '100%', fontSize: '10px' }} >

                        <div style={{ position: "absolute", top: "5%", left: "45%", width: '100%' }}>
                            <Card title={playerTitle(mainTeam[0])} position={playerPosition(mainTeam[0])} bgColor={"bg-warning"} />
                        </div>

                        <div style={{ position: "absolute", top: "10%", left: "20%", width: '100%', fontSize: '9px' }}>
                            <Card title={playerTitle(mainTeam[1])} position={playerPosition(mainTeam[1])} />
                        </div>

                        <div style={{ position: "absolute", top: "10%", left: "68%", width: '100%' }}>
                            <Card title={playerTitle(mainTeam[2])} position={playerPosition(mainTeam[2])} />
                        </div>
                        <div style={{ position: "absolute", top: "25%", left: "55%", width: '100%' }}>
                            <Card title={playerTitle(mainTeam[3])} position={playerPosition(mainTeam[3])} />
                        </div>
                        <div style={{ position: "absolute", top: "25%", left: "35%", width: '100%' }}>
                            <Card title={playerTitle(mainTeam[4])} position={playerPosition(mainTeam[4])} />
                        </div>
                        <div style={{ position: "absolute", top: "40%", left: "15%", width: '100%', fontSize: '9px' }}>
                            <Card title={playerTitle(mainTeam[5])} position={playerPosition(mainTeam[5])} bgColor={"bg-success"} />
                        </div>
                        <div style={{ position: "absolute", top: "40%", left: "45%", width: '100%' }}>
                            <Card title={playerTitle(mainTeam[6])} position={playerPosition(mainTeam[6])} bgColor={"bg-success"} />
                        </div>
                        <div style={{ position: "absolute", top: "40%", left: "73%", width: '100%' }}>
                            <Card title={playerTitle(mainTeam[7])} position={playerPosition(mainTeam[7])} bgColor={"bg-success"} />
                        </div>
                        <div style={{ position: "absolute", top: "60%", left: "45%", width: '100%' }}>
                            <Card title={playerTitle(mainTeam[8])} position={playerPosition(mainTeam[8])} bgColor={"bg-danger"} />
                        </div>
                        <div style={{ position: "absolute", top: "65%", left: "20%", width: '100%' }}>
                            <Card title={playerTitle(mainTeam[9])} position={playerPosition(mainTeam[9])} bgColor={"bg-danger"} />
                        </div>
                        <div style={{ position: "absolute", top: "65%", left: "75%", width: '100%' }}>
                            <Card title={playerTitle(mainTeam[10])} position={playerPosition(mainTeam[10])} bgColor={"bg-danger"} />
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
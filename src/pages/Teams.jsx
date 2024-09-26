import React, { useEffect, useState } from "react";
import withMainLayoutPage from "../layout/withMainLayoutPage";
import Card from "../components/Card";
import { useParams } from "react-router-dom";
import "../css/flag/flag.css"

const flagUrl = {
    germany: "/images/flag/german.jpg",
    denmark: "/images/flag/denmark.jpg",
    england: "/images/flag/england.jpg",
    hungary: "/images/flag/hungary.jpg",
    switzerland: "/images/flag/switz.jpg",
    serbia: "/images/flag/serbia.jpg",
    poland: "/images/flag/poland.jpg",
    spain: "/images/flag/spain.jpg",
}

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
    const [flag, setFlag] = useState("");




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
                setFlag(flagUrl[country]);

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

                const mainteam = [...gk, ...df, ...mf, ...fw];

                const reserves = filterData.filter(x => !mainteam.includes(x))
                setReserves(reserves)

                setPlayer(filterData)


            })
    }, [teamId])


    useEffect(() => {
        const flagContainer = document.querySelector(".flag");
        const flagWidth = flagContainer.clientWidth;
        const stripWidth = 3;
        while (flagContainer.firstChild) {
            flagContainer.removeChild(flagContainer.firstChild);
        }
        for (let i = 0; i < Math.ceil(flagWidth / stripWidth); i++) {
            const strip = document.createElement("div");
            strip.className = "flag-strip";
            strip.style.backgroundImage = `url(${flag})`
            strip.style.backgroundPosition = `-${i * stripWidth}px 0`;
            strip.style.animationDelay = `${i * 15}ms`;
            flagContainer.appendChild(strip);
        }
    }, [flag]);

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

            <div className="row " style={{ position: "relative", display: 'flex', height:'100%' }}>
                
                <div className="col-lg-7 col-md-6 col-12  " style={style.background} >
                    <div className="flag-container" >
                        <div className="flag"  >
                            <a href="" className="flag-text" ></a>
                        </div>

                    </div>
                    <div className="name">
                        {country}
                    </div>


                    <div className="pitch" style={{ position: "relative", width: '100%', height: '100%', fontSize: '10px' }} >

                        <div style={{ position: "absolute", top: "-10%", left: "43%", width: '100%' }}>
                            <Card title={playerTitle(mainTeam[0])} position={playerPosition(mainTeam[0])} bgColor={"bg-warning"} />
                        </div>

                        <div style={{ position: "absolute", top: "-4%", left: "20%", width: '100%', fontSize: '9px' }}>
                            <Card title={playerTitle(mainTeam[1])} position={playerPosition(mainTeam[1])} />
                        </div>

                        <div style={{ position: "absolute", top: "-4%", left: "68%", width: '100%' }}>
                            <Card title={playerTitle(mainTeam[2])} position={playerPosition(mainTeam[2])} />
                        </div>
                        <div style={{ position: "absolute", top: "10%", left: "55%", width: '100%' }}>
                            <Card title={playerTitle(mainTeam[3])} position={playerPosition(mainTeam[3])} />
                        </div>
                        <div style={{ position: "absolute", top: "10%", left: "35%", width: '100%' }}>
                            <Card title={playerTitle(mainTeam[4])} position={playerPosition(mainTeam[4])} />
                        </div>
                        <div style={{ position: "absolute", top: "25%", left: "15%", width: '100%', fontSize: '9px' }}>
                            <Card title={playerTitle(mainTeam[5])} position={playerPosition(mainTeam[5])} bgColor={"bg-success"} />
                        </div>
                        <div style={{ position: "absolute", top: "25%", left: "45%", width: '100%' }}>
                            <Card title={playerTitle(mainTeam[6])} position={playerPosition(mainTeam[6])} bgColor={"bg-success"} />
                        </div>
                        <div style={{ position: "absolute", top: "25%", left: "73%", width: '100%' }}>
                            <Card title={playerTitle(mainTeam[7])} position={playerPosition(mainTeam[7])} bgColor={"bg-success"} />
                        </div>
                        <div style={{ position: "absolute", top: "40%", left: "45%", width: '100%' }}>
                            <Card title={playerTitle(mainTeam[8])} position={playerPosition(mainTeam[8])} bgColor={"bg-danger"} />
                        </div>
                        <div style={{ position: "absolute", top: "55%", left: "20%", width: '100%' }}>
                            <Card title={playerTitle(mainTeam[9])} position={playerPosition(mainTeam[9])} bgColor={"bg-danger"} />
                        </div>
                        <div style={{ position: "absolute", top: "55%", left: "70%", width: '100%' }}>
                            <Card title={playerTitle(mainTeam[10])} position={playerPosition(mainTeam[10])} bgColor={"bg-danger"} />
                        </div>
                    </div>

                </div>
                <div className="col-lg-5 col-md-6 col-12 p-0 ">
                    <div style={{
                         width: '100%', height: '100%', fontSize: '30px', background: 'red', fontSize: '50px',
                        fontWeight: 'bold'
                    }}>
                        <div style={{ fontSize: '50px', textAlign: "center", padding: '20px' }}>
                            {country.toUpperCase()} COACH
                        </div>
                        <div >
                            <img src="./images/coach.webp" className="w-100" />
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
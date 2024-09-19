import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import withMainLayoutPage from "../layout/withMainLayoutPage";
import '../css/matches/Matches.css'


function Matches() {

    const round = ['Round of 16', 'Quarter-finals', 'Semi-finals', 'final']

    const flags = [
        { id: 1, imgPath: '/images/flag/germany.jpg' },
        { id: 2, imgPath: '/images/flag/scotland.jpg' },
        { id: 3, imgPath: '/images/flag/hungary.jpg' },
        { id: 4, imgPath: '/images/flag/switz.jpg' },
        { id: 5, imgPath: '/images/flag/spain.jpg' }
    ]

    const style = {
        background: {
            background: "url('/images/header/stadium4.jpg')",
            backgroundPosition: 'center center',
            backgroundSize: 'cover ',
            backgroundRepeat: 'no-Repeat',
            height: '100%',
        },
        firstRow: {
            display: 'flex',
            justifyContent: 'space-bettwen',
            marginBottom: '20px'

        },
        singleCardRow: {
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '20px'
        }
    }


    const { country } = useParams();
    const [matches, setMatches] = useState([]);
    const [teams, setTeams] = useState([]);
    const [teamId, setTeamId] = useState(null)


    function TeamId(id) {

        const team = teams.find(x => x.ID === id);

        return team.Name;
    }

    function getMatchesByTeamID(teamId) {

        return matches.filter(match => match.ATeamID === teamId || match.BTeamID === teamId);
    }

    function getFlagById(teamId) {
        const flag = flags.find(x => x.id === parseInt(teamId));
        return flag ? flag.imgPath : './images/flag/def.png ';
    }


    useEffect(() => {

        fetch('/data/matches.csv')
            .then(response => response.text())
            .then(response => {
                const rows = response.trim().split('\n');
                const headers = rows[0].split(',');
                
                const parsedData = rows.slice(1)
                    .map(row => row.split(',').map(field => field.trim()))
                    .map(x => {
                       
                        return headers.reduce((acc, header, index) => {
                            acc[header.trim()] = x[index];
                            return acc;
                        }, {});
                    });


                setMatches(parsedData);
            });
    }, [country]);

    useEffect(() => {
        fetch('/data/teams.csv')
            .then(response => response.text())
            .then(response => {
                const rows = response.trim().split('\n');
                const headers = rows[0].split(',');

                const Teams = rows.splice(1)
                    .map(row => row.split(',').map(field => field.trim()))
                    .map(x => {
                        return headers.reduce((acc, header, index) => {
                            acc[header.trim()] = x[index];
                            return acc;
                        }, {});
                    });
                const TeamId = Teams.find(x => x.Name.toLowerCase() === country.toLowerCase())
                setTeamId(TeamId.ID)
                setTeams(Teams);

            });
    }, []);

    const matchesForTeam1 = getMatchesByTeamID(teamId);
    const numberOfCards = matchesForTeam1.length;

    return (
        <>
            <div className="row" style={{ display: 'flex', boxSizing: 'border-box', height: '100%' }}>
                <div className="col-12" style={style.background} >
                    <div style={{ width: '90%', display: 'flex', flexDirection: 'column', color: 'white' }}>

                        <h4 className="text-center mb-3 text-warning ">Group </h4>
                        {numberOfCards >= 3 && (
                            <div style={{
                                display: 'flex', justifyContent: 'space-around',
                                flexDirection: window.innerWidth <= 576 ? 'column' : 'row',
                                alignItems: 'center'
                            }}>

                                {matchesForTeam1.slice(0, 3).map((match) => (
                                    <div className=" col-lg-3 col-md-4 col-10 mb-3 card-m"  >
                                        <div className="card-p">

                                            <p style={{ color: 'red' }}> {TeamId(match.ATeamID)}</p>
                                            <p className="text-dark"> {match.Score}</p>
                                            <p style={{ color: 'blue' }}> {TeamId(match.BTeamID)}</p>
                                        </div>

                                        <div>{match.Date}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                            {matchesForTeam1.slice(3).map((match, index) => (
                                <>
                                    <h4>{round[index]}</h4>
                                    <div className=" col-lg-3 col-md-4 col-10 mb-3 card-m" style={{ marginBottom: '40px' }} >

                                        <div className="card-p" >

                                            <p style={{ color: 'red' }}> {TeamId(match.ATeamID)}</p>
                                            <p>  {match.Score}</p>

                                            <p style={{ color: 'blue' }}> {TeamId(match.BTeamID)}</p>
                                        </div>
                                        <div>{match.Date}</div>
                                    </div>
                                </>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
export default withMainLayoutPage(Matches);
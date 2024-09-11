import React, { useEffect, useState } from "react";
import withMainLayoutPage from "../layout/withMainLayoutPage";
import Card from "../components/Card";



function Germany() {

    const style = {
        background: {
            background: "url('/images/peatch2.jpg')",
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


    function s(player) {

        if (player && player.FullName) {
            return player.FullName;
        }

    }

    return (
        <>
            <div className="row" style={{ display: 'flex', boxSizing: 'border-box', height: '100%' }}>
            
                <div className="col-lg-7 col-md-6 col-12 mb-4 " style={style.background} >

                    <div style={{ width: '80px', height: '20px', fontSize: '10px' }} >

                        <div style={{ margin: '5px 0 0 330px', width: '100%' }}>
                            <Card title={s(player[0])} age={30} position={'dh'} bgColor={"bg-warning"} />
                        </div>

                        <div style={{ margin: '-20px 0 0 145px', width: '100%', fontSize: '9px' }}>
                            <Card title={s(player[1])} age={30} position={'dh'} />
                        </div>

                        <div style={{ margin: '-70px 0 0 510px', width: '100%' }}>
                            <Card title={s(player[2])} age={30} position={'dh'} />
                        </div>
                        <div style={{ margin: '15px 0 0 250px', width: '100%' }}>
                            <Card title={s(player[3])} age={30} position={'dh'} />
                        </div>
                        <div style={{ margin: '-70px 0 0 400px', width: '100%' }}>
                            <Card title={s(player[4])} age={30} position={'dh'} />
                        </div>
                        <div style={{ margin: '40px 0 0 140px', width: '100%', fontSize: '9px' }}>
                            <Card title={s(player[5])} age={30} position={'dh'} bgColor={"bg-success"} />
                        </div>
                        <div style={{ margin: '-70px 0 0 330px', width: '100%' }}>
                            <Card title={s(player[6])} age={30} position={'dh'} bgColor={"bg-success"} />
                        </div>
                        <div style={{ margin: '-70px 0 0 540px', width: '100%' }}>
                            <Card title={s(player[7])} age={30} position={'dh'} bgColor={"bg-success"} />
                        </div>
                        <div style={{ margin: '40px 0 0 330px', width: '100%' }}>
                            <Card title={s(player[8])} age={30} position={'dh'} bgColor={"bg-success"} />
                        </div>
                        <div style={{ margin: '20px 0 0 160px', width: '100%' }}>
                            <Card title={s(player[9])} age={30} position={'dh'} bgColor={"bg-danger"} />
                        </div>
                        <div style={{ margin: '-70px 0 0 490px', width: '100%' }}>
                            <Card title={s(player[10])} age={30} position={'dh'} bgColor={"bg-danger"} />
                        </div>
                    </div>

                </div>
                <div className="col-lg-5 col-md-6 col-12">
                    <div style={{marginLeft:'-12px',  width: '100%', height: '100%', fontSize: '30px', background: 'red', fontSize: '50px',
                     fontWeight: 'bold'  }}>
                        <div style={{ fontSize: '50px', textAlign: "center", padding: '20px' }}>
                            GERMANY COACH
                        </div>
                        <div>
                            <img src="./images/coach.webp" />
                        </div>
                        <div style={{ textAlign: "center" }}>
                            {coach()}
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}
export default withMainLayoutPage(Germany);
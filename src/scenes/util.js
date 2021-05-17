async function saveScore(user, score) {
  let data = {};
  data['user'] = (user) ? user : "Default User";
  data['score'] = score;

  let resp = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/jHGn9ULPvKWyvvbgeHRG/scores/', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  })
  return resp.json();
}

async function getScore() {
  let resp = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/jHGn9ULPvKWyvvbgeHRG/scores/', {
    method: 'GET',
    mode: 'cors',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  })
  return resp.json();
}

export {saveScore, getScore};

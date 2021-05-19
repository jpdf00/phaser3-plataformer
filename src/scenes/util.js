const saveScore = async (user, score) => {
  const data = {};
  data.user = (user) || 'Default User';
  data.score = score;

  const resp = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/RZXaks6YhNDB3iX9OIOY/scores/', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });
  return resp.json();
};

const getScore = async () => {
  const resp = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/RZXaks6YhNDB3iX9OIOY/scores/', {
    method: 'GET',
    mode: 'cors',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  });
  return resp.json();
};

const sortArray = (array) => {
  for (; ;) {
    let notChanged = true;
    for (let j = 0; j < array.length - 1; j += 1) {
      if (array[j].score < array[j + 1].score) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        notChanged = false;
      }
    }
    if (notChanged) {
      break;
    }
  }
  return array;
};

export { saveScore, getScore, sortArray };

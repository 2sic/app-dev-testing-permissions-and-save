const users = {
  // host
  SuperUser: 'SuperUser',

  // admin
  PapaSmurf: 'Papa Smurf',

  // Smurfs
  BrainySmurf: 'Brainy Smurf',
  GreedeSmurf: 'Greede Smurf',
  Smurfette: 'Smurfette',
  AppSmurf: 'AppSmurf', // for app-permission checks

  // Bad Guys
  Gargamel: 'Gargamel',
  Azrael: 'Azrael',

  // registered users
  LoneRanger: 'Lone Ranger',
  Spiderman: 'Spiderman',
  Hulk: 'Hulk',

  Anonymous: '',
}

const passwords = {
  default: 'Split2018!',
}

function install() {
  for (var user in users) {
    if (!!users[user]){
      register(users[user], passwords.default, logUser);
    }
  }
}

function logUser(message) {
  return log("user: " + message);
}

function log(message) {
  console.log('stv log', message);
  var userRolesStatus = document.getElementById('userRolesStatus');
  userRolesStatus.innerHTML += message + '<br>';
}

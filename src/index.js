import Template from '@templates/Template.js';
import '@styles/main.css';    //importo los estilos
import '@styles/vars.styl';


(async function App() {
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
})();

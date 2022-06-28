export function Board({ G, ctx, moves }) {
  const onClick = (id) => moves.clickCell(id);

  let loser = '';
  if (ctx.gameover) {
    loser =
        <div id="winner">Loser: {ctx.gameover.loser}</div>
  }

  return (
    <div>
    <p class="text-justify">
        Ez a játék a XIII. Dürer döntőjén szerepelt E kategóriában.

        Károly és Dezső m-ig szeretnének elszámolni, és közben a következő játékot játsszák:
        0-ról kezdenek, a két játékos felváltva adhat hozzá egy 13-nál kisebb pozitív egészet a korábbi
        számhoz, azonban a babonájuk miatt ha egyikük x-et adott hozzá, akkor másikuk a következő
        lépésben nem adhat hozzá 13 − x-et. Az veszít, aki eléri (vagy átlépi) m-et.

        Az új játék gombra kattintva generálhatsz egy felállást.

        Az m szám ismeretében te döntheteted el, hogy a kezdő vagy a második játékos bőrébe szeretnél e bújni.
      </p>
      <div class="flex flex-wrap">
      <div class="p-1 shrink-0 grow basis-8/12">
        <table class="m-2 border-collapse">
            <tr>
              <th>Szám</th>
              <th>Cél</th>
              <th>Tiltott lépés</th>
            </tr>
            <tr>
              <td class="text-center h-36 w-36 border-4 text-8xl">{G.current}</td>
              <td class="text-center h-36 w-36 border-4 text-8xl">{G.target}</td>
              <td class="text-center h-36 w-36 border-4 text-8xl">{G.restricted || "-"}</td>
            </tr>
          </table>
            <label for="step"> Következő lépés: </label>
            <input id="step" type="number" min="1" max="12" v-model="step" class="border-2" />
            <button
              class="cta-button"
            >Lépek</button>
        </div>
      </div>

    </div>
  );
}
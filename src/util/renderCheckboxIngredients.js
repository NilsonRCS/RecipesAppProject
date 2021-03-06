import React, { useEffect } from 'react';
import Proptypes from 'prop-types';
import '../PagesCss/Checkbox.css';

export default function RenderCheckboxIngredients(
  { ingredients, inProgress, setInProgress },
) {
  const urlType = window.location.href.split('/')[3];
  const urlId = window.location.href.split('/')[4];

  const checkls = (ls) => {
    let add = '';
    if (!ls.meals[urlId] && !ls.cocktails[urlId]) {
      if (urlType === 'comidas') {
        add = {
          ...ls,
          meals: {
            ...ls.meals, [urlId]: ls.meals[urlId] ? ls.meals[urlId] : [],
          },
        };
      } else {
        add = {
          ...ls,
          cocktails: {
            ...ls.cocktails, [urlId]: ls.cocktails[urlId] ? ls.cocktails[urlId] : [],
          },
        };
      }
      localStorage.setItem('inProgressRecipes', JSON.stringify(add));
    }
  };

  useEffect(() => {
    const renderStorage = () => {
      const ls = JSON.parse(localStorage.getItem('inProgressRecipes'));
      let add = '';

      if (ls) checkls(ls);

      if (!ls) {
        if (urlType === 'comidas') {
          add = {
            meals: {
              [urlId]: [],
            },
            cocktails: {},
          };
        } else {
          add = {
            cocktails: {
              [urlId]: [],
            },
            meals: {},
          };
        }
        localStorage.setItem('inProgressRecipes', JSON.stringify(add));
      }
    };
    renderStorage();
    setInProgress(JSON.parse(localStorage.getItem('inProgressRecipes')));
  }, []);

  const updateStorage = (item, checked) => {
    const id = window.location.href.split('/')[4];
    const prevIngr = urlType === 'bebidas'
      ? inProgress.cocktails[id].filter((lsItem) => !lsItem.includes(item))
      : inProgress.meals[id].filter((lsItem) => !lsItem.includes(item));
    let addDrink = {};
    if (checked) {
      if (urlType === 'bebidas') {
        addDrink = {
          ...inProgress,
          cocktails: { ...inProgress.cocktails, [id]: [...prevIngr, item] },
        };
      } else {
        addDrink = {
          ...inProgress, meals: { ...inProgress.meals, [id]: [...prevIngr, item] },
        };
      }
    }
    if (!checked) {
      if (urlType === 'bebidas') {
        addDrink = {
          ...inProgress, cocktails: { ...inProgress.cocktails, [id]: prevIngr },
        };
      } else {
        addDrink = {
          ...inProgress, meals: { ...inProgress.meals, [id]: prevIngr },
        };
      }
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(addDrink));
    setInProgress(JSON.parse(localStorage.getItem('inProgressRecipes')));
  };

  const getStorage = (ingredient) => {
    const { cocktails } = inProgress;
    const { meals } = inProgress;
    let bool = false;
    if (urlType === 'bebidas' && cocktails[urlId]) {
      bool = cocktails[urlId].includes(ingredient);
    }
    if (urlType === 'comidas' && meals[urlId]) {
      bool = meals[urlId].includes(ingredient);
    }
    return bool;
  };

  return (
    <div>
      { inProgress && (
        ingredients.map((item, index) => (
          <div key={ item } data-testid={ `${index}-ingredient-step` }>
            <label htmlFor="ingredient" className={ getStorage(item) ? 'risca' : '' }>
              {item}
              <input
                id={ index }
                name="ingredient"
                checked={ getStorage(item) }
                onChange={ ({ target }) => updateStorage(item, target.checked) }
                type="checkbox"
              />
            </label>
          </div>
        ))
      )}
    </div>
  );
}

RenderCheckboxIngredients.propTypes = {
  ingredients: Proptypes.arrayOf(Proptypes.string),
}.isRequired;

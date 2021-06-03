import set from 'lodash/set';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import AppContext from '../../../context/AppContext';
import AddItemButton from '../../../shared/AddItemButton';
import Checkbox from '../../../shared/Checkbox';
import Counter from '../../../shared/Counter';
import ItemActions from '../../../shared/ItemActions';
import ItemHeading from '../../../shared/ItemHeading';
import TextField from '../../../shared/TextField';
import { addItem } from '../../../utils';

const LanguagesTab = ({ data, onChange }) => {
  const context = useContext(AppContext);
  const { dispatch } = context;

  useEffect(() => {
    if (!('languages' in data)) {
      dispatch({
        type: 'migrate_section',
        payload: {
          key: 'languages',
          value: {
            enable: false,
            heading: 'Languages',
            items: [],
          },
        },
      });

      dispatch({ type: 'save_data' });
    }
  }, [data, dispatch]);

  return (
    'languages' in data && (
      <>
        <div className="mb-6 grid grid-cols-6 items-center">
          <div className="col-span-1">
            <Checkbox
              checked={data.languages.enable}
              onChange={v => onChange('data.languages.enable', v)}
            />
          </div>
          <div className="col-span-5">
            <TextField
              placeholder="Heading"
              value={data.languages.heading}
              onChange={v => onChange('data.languages.heading', v)}
            />
          </div>
        </div>

        <hr className="my-6" />

        {data.languages.items.map((x, index) => (
          <Item
            item={x}
            key={x.id}
            index={index}
            onChange={onChange}
            dispatch={dispatch}
            first={index === 0}
            last={index === data.languages.items.length - 1}
          />
        ))}

        <AddItem heading={data.languages.heading} dispatch={dispatch} />
      </>
    )
  );
};

const Form = ({ item, onChange, identifier = '' }) => {
  const { t } = useTranslation('leftSidebar');

  return (
    <div>
      <TextField
        className="mb-6"
        label={t('languages.key.label')}
        placeholder="English"
        value={item.key}
        onChange={v => onChange(`${identifier}key`, v)}
      />

      <TextField
        className="mb-6"
        label={t('languages.level.label')}
        placeholder="B1"
        value={item.level}
        onChange={v => onChange(`${identifier}level`, v)}
      />

      <Counter
        className="mb-6"
        label={t('languages.rating.label')}
        value={item.rating}
        onDecrement={() =>
          item.rating > 1
            ? onChange(`${identifier}rating`, item.rating - 1)
            : onChange(`${identifier}rating`, 0)
        }
        onIncrement={() =>
          item.rating < 5
            ? onChange(`${identifier}rating`, item.rating + 1)
            : onChange(`${identifier}rating`, 0)
        }
      />
    </div>
  );
};

const AddItem = ({ heading, dispatch }) => {
  const [isOpen, setOpen] = useState(false);
  const [item, setItem] = useState({
    id: uuidv4(),
    enable: true,
    key: '',
    value: '',
    rating: 1,
  });

  const onChange = (key, value) => setItem(items => set({ ...items }, key, value));

  const onSubmit = () => {
    if (item.key === '') return;

    addItem(dispatch, 'languages', item);

    setItem({
      id: uuidv4(),
      enable: true,
      key: '',
      value: '',
      rating: 1,
    });

    setOpen(false);
  };

  return (
    <div className="my-4 border border-gray-200 rounded p-5">
      <ItemHeading heading={heading} setOpen={setOpen} isOpen={isOpen} />

      <div className={`mt-6 ${isOpen ? 'block' : 'hidden'}`}>
        <Form item={item} onChange={onChange} />

        <AddItemButton onSubmit={onSubmit} />
      </div>
    </div>
  );
};

const Item = ({ item, index, onChange, dispatch, first, last }) => {
  const [isOpen, setOpen] = useState(false);
  const identifier = `data.languages.items[${index}].`;

  return (
    <div className="my-4 border border-gray-200 rounded p-5">
      <ItemHeading title={item.key} setOpen={setOpen} isOpen={isOpen} />

      <div className={`mt-6 ${isOpen ? 'block' : 'hidden'}`}>
        <Form item={item} onChange={onChange} identifier={identifier} />

        <ItemActions
          dispatch={dispatch}
          first={first}
          identifier={identifier}
          item={item}
          last={last}
          onChange={onChange}
          type="languages"
        />
      </div>
    </div>
  );
};

export default LanguagesTab;
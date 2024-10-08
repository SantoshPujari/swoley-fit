import React, { useState } from 'react';
import SectionWrapper from './SectionWrapper';
import { SCHEMES, WORKOUTS } from '../utils/swoldiers';
import Button from './Button';

function Header(props) {
  const { index, title, decsription } = props;

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-center gap-2'>
        <p className='text-3xl sm:text-4xml md:text-5xl font-semibold text-slate-400'>
          {index}
        </p>
        <h4 className='text-xl sm:text-2xl md:text-3xl'>{title}</h4>
      </div>
      <p className='text-sm sm:text-base mx-auto'>{decsription}</p>
    </div>
  );
}

const Generator = ({
  poison,
  setPoison,
  muscles,
  setMuscels,
  goal,
  setGoal,
  updateWorkout,
}) => {
  const [showModal, setShowModal] = useState(false);

  function toggleModal() {
    setShowModal(!showModal);
  }

  function updateMuscles(muscleGroup) {
    if (muscles.includes(muscleGroup)) {
      setMuscels(muscles.filter((val) => val !== muscleGroup));
      return;
    }

    if (muscles.length > 2) {
      return;
    }

    if (poison !== 'individual') {
      setMuscels([muscleGroup]);
      setShowModal(false);
      return;
    }

    setMuscels([...muscles, muscleGroup]);
    if (muscles.length === 2) {
      setShowModal(false);
    }
  }

  return (
    <div className='min-h-screen'>
      <SectionWrapper
        id={'generate'}
        header={'generate your workout'}
        title={["it's", 'Huge', "o'clock"]}
      >
        <Header
          index={'01'}
          title={'Pick the workout'}
          decsription={'Select the workout you wish to enjoy'}
        />
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
          {Object.keys(WORKOUTS).map((type, typeIndex) => {
            return (
              <button
                onClick={() => {
                  setMuscels([]);
                  setPoison(type);
                }}
                className={
                  'bg-slate-950 border duration-200 px-4 hover:border-blue-600 py-3 rounded-lg ' +
                  (type === poison ? ' border-blue-400' : ' border-blue-600')
                }
                key={typeIndex}
              >
                <p className='capitalize'>{type.replaceAll('_', ' ')}</p>
              </button>
            );
          })}
        </div>

        <Header
          index={'02'}
          title={'Lock on targets'}
          decsription={'Select the muscles judged for annihilation'}
        />
        <div className='bg-slate-950 border border-solid border-blue-400 rounded-lg flex flex-col'>
          <button
            onClick={toggleModal}
            className='relative p-3 flex items-center justify-center'
          >
            <p className='capitalize'>
              {muscles.length == 0 ? 'Select muscle group' : muscles.join(' ')}
            </p>
            <i className='fa-solid absolute right-3 top-1/2 -translate-y-1/2  fa-caret-down'></i>
          </button>

          {showModal && (
            <div className='flex flex-col'>
              {(poison === 'individual'
                ? WORKOUTS[poison]
                : Object.keys(WORKOUTS[poison])
              ).map((muscleGroup, muscleGroupIndex) => {
                return (
                  <button
                    onClick={() => {
                      updateMuscles(muscleGroup);
                    }}
                    key={muscleGroupIndex}
                    className={
                      'hover:text-blue-400 duration-200 ' +
                      (muscles.includes(muscleGroup) ? ' text-blue-400' : ' ')
                    }
                  >
                    <p className='uppercase'>
                      {muscleGroup.replaceAll('_', ' ')}
                    </p>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <Header
          index={'03'}
          title={'Become Juggernaut'}
          decsription={'Select your ultimate objective'}
        />
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
          {Object.keys(SCHEMES).map((scheme, schemeIndex) => {
            return (
              <button
                onClick={() => {
                  setGoal(scheme);
                }}
                className={
                  'bg-slate-950 border px-4 duration-200 hover:border-blue-600 py-3 rounded-lg ' +
                  (scheme === goal ? ' border-blue-400' : ' border-blue-600')
                }
                key={schemeIndex}
              >
                <p className='capitalize'>{scheme.replaceAll('_', ' ')}</p>
              </button>
            );
          })}
        </div>
        <Button func={updateWorkout} text={'Formutate'}></Button>
      </SectionWrapper>
    </div>
  );
};

export default Generator;

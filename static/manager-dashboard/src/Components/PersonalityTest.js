import React, { useEffect, useState } from 'react';
import { invoke, view } from '@forge/bridge';
const questions = require('../temp.json'); //TODO: I commited this for ease of development, change to === 

function PersonalityTest() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [results, setResult] = useState(null);
    const values = {
        1: 'Never',
        2: 'Rarely',
        3: 'Sometimes',
        4: 'Often',
        5: 'Always'
    }

    useEffect(() => {
        if (questions[currentIndex].value) {
            document.getElementById(values[questions[currentIndex].value]).checked = true;
        }
        
    },[currentIndex]);

    const nextQuestion = () => {
        const currentlySelected = document.querySelector('input[name="question"]:checked');
        if (!currentlySelected) {
            return;
        }
        questions[currentIndex].value = currentlySelected.value;

        currentlySelected.checked = false;
        setCurrentIndex(currentIndex + 1);
    }

    const previousQuestion = () => {
        setCurrentIndex(currentIndex - 1);
    }

    const submit = async () => {
        const currentlySelected = document.querySelector('input[name="question"]:checked');
        if (!currentlySelected) {
            return;
        }
        questions[currentIndex].value = currentlySelected.value;

        const personality = {};
        for (const question of questions) {
            if (!personality.hasOwnProperty(question.domain)) {
                personality[question.domain] = {};
                personality[question.domain].total = parseInt(0);
            }
            
            const value = parseInt(question.value);
            personality[question.domain].total += question.key === "+" ? value: - value;
            personality[question.domain].facet = question.key === "+" ? value: - value;
        }
        const context = await view.getContext();
        invoke('storePersonalityResults', { personality, accountId: context.accountId });
    }

    return (
        <div>
            <h2>IPIP 120 Personality Test</h2>
            <h3>Question { currentIndex + 1 }</h3>
            <p> {questions[currentIndex].question } </p>
            <form id="form">
                <input type="radio" name="question" value="1" id="Never"/>
                <label for="Never">Never</label>
                <input type="radio" name="question" value="2" id="Rarely"/>
                <label for="Rarely">Rarely</label>
                <input type="radio" name="question" value="3" id="Sometimes"/>
                <label for="Sometimes">Sometimes</label>
                <input type="radio" name="question" value="4" id="Often"/>
                <label for="Often">Very Often</label>
                <input type="radio" name="question" value="5" id="Always"/>
                <label for="Always">Always</label>
            </form>
            
            {currentIndex > 0 &&
                <button id="previous" onClick={previousQuestion}>Previous</button>
            }
            {currentIndex < 119 &&
                <button id="next" onClick={nextQuestion}>Next</button>
            }
            {currentIndex < 119 && //TODO: I commited this for ease of development, change to === 
                <button id="submit" onClick={submit}>Submit</button>
            }
        </div>
    );
}

export default PersonalityTest;
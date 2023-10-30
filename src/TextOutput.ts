type TokenizedText = string[][]
import { tokenize } from "./utils";

export class TextOutput{
    $el: HTMLElement;
    $container: HTMLElement;
    scrollAmount = 0;

    $currentChar: Element|null|undefined =null;
    constructor($el: HTMLElement, $container: HTMLElement){
        this.$el = $el,
        this.$container = $container;
    }

    createChar(key: string){
        const $char = document.createElement('div')
        $char.classList.add('char')
        $char.innerText = key;
        return $char;
    }



    pushFalseChar(wordIndex: number, charIndex: number, key: string){
        const $word = this.getWordElement(wordIndex)
        const $char = this.createChar(key)
        $char.classList.add('extra')
        const $space = $word?.lastElementChild
        if ($word && $space) {
            $word.insertBefore($char, $space)
        }else{
            console.error('Failed to insert a node')
        }
    }

    popFalseChar(wordIndex: number){
        const $word = this.getWordElement(wordIndex)
        $word?.lastElementChild?.previousElementSibling?.remove()
    }

    getWordElement(wordIndex: number){
        return this.$el.children.item(wordIndex)
    }

    getCharElement(wordIndex: number, charIndex: number){
        const $word = this.$el.children.item(wordIndex)
        const $char = $word?.children.item(charIndex)
        return $char
    }
    markCharacter(wordIndex: number, charIndex: number, mark: string){
        const $char = this.getCharElement(wordIndex, charIndex);
        $char?.setAttribute('data-status', mark)
    }

    highlightWord(wordIndex: number){
        const $word = this.getWordElement(wordIndex);
        $word?.classList.add('correct')
    }

    moveCaret(wordIndex: number, charIndex: number){
        
        if (this.$currentChar) {
            this.$currentChar.classList.remove('has-caret')
        }
        this.$currentChar = this.getCharElement(wordIndex, charIndex)
        this.$currentChar?.classList.add('has-caret')
        
        const charRect = this.$currentChar?.getBoundingClientRect()
        const containerRect = this.$container.getBoundingClientRect()
        console.log(charRect?.top, containerRect.top)
        if (charRect?.bottom == containerRect.bottom) {
            this.scrollAmount+=30
            this.$el.style.transform = `translateY(-${this.scrollAmount}px)`
        }else if(charRect?.top == containerRect.top && this.scrollAmount != 0){
            this.scrollAmount-=30;
            this.$el.style.transform = `translateY(-${this.scrollAmount}px)`


        }
    }

    loadTokens(tokens: string[][]){
        const $words = tokens.map((word, wordIndex)=> {
            const $word = document.createElement('div')
            $word.classList.add('word')
            $word.setAttribute('data-word-index', wordIndex.toString())

            $word.append(...word.map((char, charIndex)=>{
                const $char = document.createElement('div')
                $char.classList.add('char')
                $char.innerText = char
                $char.setAttribute('data-char-index', charIndex.toString())
                return $char
            }))
            const $space = document.createElement('div')
            $space.classList.add('space')
            $space.innerText = ' '
            $word.append($space)
            return $word;

        })
        this.$el.innerHTML = ''
        this.$el.append(...$words)
        this.moveCaret(0,0)
    }
}
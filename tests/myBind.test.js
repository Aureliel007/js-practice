require('../src/myBind');

describe('Function.prototype.myBind', () => {
    function greet(greeting, punctuation) {
        return greeting + ', ' + this.name + punctuation;
    }
    const person = { name: 'Алиса' };
    test('привязывает this', () => {
        const greetAlice = greet.myBind(person, 'Привет');
        expect(greetAlice('!')).toBe('Привет, Алиса!');
    });

    test('работает без предзаданных аргументов', () => {
        const greetAnyone = greet.myBind(person);
        expect(greetAnyone('Привет', '?')).toBe('Привет, Алиса?');
    });

    test('сохраняет this при вызове через new', () => {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        const BoundPoint = Point.myBind(null, 1);
        const p = new BoundPoint(2);

        expect(p.x).toBe(1);
        expect(p.y).toBe(2);
        expect(p instanceof Point).toBe(true);
    });

    test('выбрасывает TypeError, если вызван не на функции', () => {
        expect(() => {
            Function.prototype.myBind.call(123, {});
        }).toThrow(TypeError);
    });
});

const User = require('../src/userChain');

describe('User chaining', () => {
    beforeEach(() => {
        global.prompt = jest.fn();
        global.alert = jest.fn();
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
        delete global.prompt;
        delete global.alert;
    });

    test('askName записывает введённое имя', () => {
        global.prompt.mockReturnValue('Алиса');
        const u = new User();
        u.askName();
        expect(u.name).toBe('Алиса');
        expect(global.prompt).toHaveBeenCalledWith('Введите имя:');
    });

    test('askAge записывает введённый возраст', () => {
        global.prompt.mockReturnValue('6');
        const u = new User();
        u.askAge();
        expect(u.age).toBe('6');
    });

    test('showAgeInConsole выводит возраст в консоль', () => {
        const u = new User();
        u.age = '25';
        u.showAgeInConsole();
        expect(console.log).toHaveBeenCalledWith('25');
    });

    test('showNameInAlert показывает имя в alert', () => {
        const u = new User();
        u.name = 'Quack';
        u.showNameInAlert();
        expect(global.alert).toHaveBeenCalledWith('Quack');
    });

    test('полная цепочка вызовов работает без ошибок и в правильном порядке', () => {
        global.prompt.mockReturnValueOnce('Алиса').mockReturnValueOnce('6');

        const u = new User();
        const result = u
            .askName()
            .askAge()
            .showAgeInConsole()
            .showNameInAlert();

        expect(result).toBe(u);
        expect(u.name).toBe('Алиса');
        expect(u.age).toBe('6');
        expect(console.log).toHaveBeenCalledWith('6');
        expect(global.alert).toHaveBeenCalledWith('Алиса');
    });
});

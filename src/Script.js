export class Script extends MerakiScript {
    execute() {
        // TODO: add p5 setup() code
    }

    draw() {
        super.draw();
        // p5 draw() code here
    }

    initialize() {
        super.initialize();
        // p5 preload() code here
    }

    version() {
        return '0.0.1';
    }

    configure() {
        return {
            sdkVersion: '1.x',
            renderTimeMs: 50,
            library: {
                name: 'p5',
                version: '1.4.0',
            }
        }
    }
    
    traits() {
        //ScriptTraits is automatically imported
        const traits = new ScriptTraits();
        
        return { color: Meraki.random.element(traits.color()) };
    }
}

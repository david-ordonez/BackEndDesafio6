const fs = require('fs');

class FileManager {
    static async saveFile(fileName, content){
        try {
            await fs.promises.writeFile(fileName,content);
        } catch (error) {
            throw error;
        }
    }

    static async readFile(fileName){
        try {
            if(fs.existsSync(fileName)){
                const content = await fs.promises.readFile(fileName,'utf-8');
                if(content === ''){
                    return []
                }
                return JSON.parse(content);
            }
            return [];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = FileManager;
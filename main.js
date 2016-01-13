var watch = require('node-watch'),
    ffmpeg = require('fluent-ffmpeg'),
    mcrypt = require('mcrypt').MCrypt,
    tripleDES = new mcrypt('tripledes', 'ecb'),
    winston = require('winston'),
    fs = require('fs'),
    path = __dirname + '/../data',
    args = process.argv.slice(2),
    file = args[0],
    user = args[1];


    new ffmpeg({
        source: path + '/temp/' + file
    })
    .withVideoCodec('libvpx')
    .toFormat('webm')
    .on('error', function(err, stdout, stderr){
        console.log(err);
    })
    .on('end', function(){
        process.stdout.write('converted');

        tripleDES.open('cgThUA3LGnPQCFNSPEQkaAB9');

        fs.readFile(path + '/' + user + '/webm/' + file + '.webm.tmp', function(err, data)
        {
            if(err)
                winston.log('info', err);

            var encrypted = tripleDES.encrypt(data);

            fs.writeFile(path + '/' + user + '/webm/' + file + '.webm', encrypted, function(err, data)
            {
                if(err)
                    process.stderr.write(err);
                else
                    process.stdout.write('encrypted');

                fs.unlinkSync(path + '/' + user + '/webm/' + file + '.webm.tmp');
            });
        });
    })
    .saveToFile(path + '/' + user + '/webm/' + file + '.webm.tmp');
    

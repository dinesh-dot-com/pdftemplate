    const express = require('express');
    const PDFDocument = require('pdfkit');
    const fs = require('fs');
    const exec = require('child_process').exec;

    const app = express();

    // Function to generate the PDF
    function generatePDF() {
        const doc = new PDFDocument({ margin: 0}); // Set margin to 50 units
        const output = fs.createWriteStream('output.pdf');

        // Add the first page with fixed image
        doc.image('../pdftemplate/images/firstpage.jpg', { width: 612 , height: 800}); // Fixed image for the first page

        // Add header with image to subsequent pages
        doc.on('pageAdded', () => {
            doc.image('../pdftemplate/images/header.png', { width: 613, align: 'center' });
        });

        let addFooter = false;

        // Add footer with image to each page
        doc.on('pageAdded', () => {
            if (addFooter) {
                doc.image('../pdftemplate/images/footer.png', { width: 769, align: 'center', y: doc.page.height - 78, x: doc.page.height - 945 });
            }
        });

            for (let i = 0; i < 5; i++) {
                doc.addPage();

                if (i === 0) {
                    addFooter = true;
                    doc.font('Times-Roman')
                    .fontSize(8.8)
                    .text(`
                    Aircraft:
                    Serial No. :
                    Date : `,400,100,{align:'left'});
                    doc.font('Times-Roman')
                    .fontSize(8.8)
                    .text(`
                    Dear Sir/Madam,
                
                    We are Pleased to offer to you the King Air C90 Aircraft.
                    The commercials for the same will be as follows`,0,100,{align:'left'});

                    doc.image('../pdftemplate/images/900xp.jpg',0, 490, {width: 623, height: 300});
                    doc.image('../pdftemplate/images/footer.png', { width: 769, align: 'center', y: doc.page.height - 78, x: doc.page.height - 945 });
                }
                if (i === 1) {
                    addFooter = true;

                    doc.image('../pdftemplate/images/seat1.jpg',0, 500, {width: 287, height: 300});
                    doc.image('../pdftemplate/images/seat2.jpg',292, 500, {width: 320, height: 250});
                    doc.image('../pdftemplate/images/footer.png', { width: 769, align: 'center', y: doc.page.height - 78, x: doc.page.height - 945 });
                }
                if (i === 2) {

                    doc.image('../pdftemplate/images/specification2.JPG',50, 100, {width: 280, height: 250});
                    doc.image('../pdftemplate/images/ls.png',420, 100, {width: 70, height: 300});

                    doc.font('Times-Bold')
                    .fontSize(12)
                    .text(`Please Note:`
                    ,0,590,{align: 'center',underline: true});
                    doc.font('Times-Roman')
                    .fontSize(8.8)
                    .text(`
                    1. All quotations/options provided above are subject to all necessary permission and aircraft availability at the time of charter confirmation.
                    
                    2. Airport Handling Charges are approximation, this will be charged on actuals.
                    
                    3. Flying time approximate may change on actuals.
                    
                    4. TBL for pilots for any waiting beyond 4 hours or over night journeys will be chargeable extra on Actuals.
                    
                    5. This Quotes will valid for 24 Hours, but does not Guarantee a reservation/ Booking. Aircraft booking are always on first come first served basis.`
                ,0,610);

                }
                if (i === 3) {
                    doc.font('Times-Bold') // Set font to bold
                    .fontSize(12)
                    .text('Terms & Conditions:', {
                        align: 'center',
                        underline: true,
                    });
                    doc.font('Times-Roman') // Set font back to normal
                    .fontSize(8.8)
                    .text(`
                
                1. We would require the requested information within the stipulated timelines, in order to enable us to seek the necessary permissions for the 
                effecting of the flight.

                2. Sparzana Aviation Private Limited will not be responsible in any manner whatsoever for passengers traveling without the relevant travel documents 
                and/or, carrying any contraband items and/or, involved/indulging in any illegal activities.
                
                3. Minimum 2 hours ‘per aircraft per day’ or actuals ‘per aircraft per day’, whichever is higher – will charged for a booking.
                
                4. If there is no flying on a particular day of a Charter, a minimum of 2 (two) hour of flying time will be charged as “Non-Flying Day Charge” 
                and in this case, no night halt charge will be levied.
                
                5. Flying hour charges include the cost of the Aircraft fuel, oil, maintenance, landing and day parking charges, standard in-flight meals,
                navigation fees and dispatch cost of the aircraft.
                
                6. In addition to applicable Taxes, we would be charging for the below mentioned items:
                a. Domestic Flights:
                (i) Ground Handling service charges
                (ii) Extension of watch hours (if applicable)
                (iii) Day Detention charges are applicable after 4 hours of waiting at a destination.
                (iv) Night Halt charges (if applicable)
                
                7. Advance Payment:
                A minimum booking amount of 10% of quoted value, must be deposited to block the charter. Charters shall be solely made available to the 
                parties on First Come,First Served basis.

                8. Balance Payment:
                The balance payable is payable no later than 72 hours before the operation of your first flight If the booking is made within 72 hours of 
                the operation of Charterer’s first flight, the full amount of the Charter Quote is payable to us at that time. Charterer understands and agrees 
                that the time of payment is an essential term of this Agreement. Sparzana Aviation reserves its right to withhold services until it receives 
                payment of the full amount of the Charter Quote. Should Charterer fail to pay the charter quote in time, then the flight will become subject 
                to availability again and may by cancelled by Sparzana Aviation without recourse to Charterer.
                
                9. Cancellation Terms Should a confirmed flight be cancelled by Charterer; a cancellation fee will be
                levied as followed against the full charter price:
                (i) 10% with immediate effect
                (ii) 25% if cancelled within 14 days of the proposed schedule
                (iii) 50% if cancelled within 7 days of the proposed schedule
                (iv) 75% if cancelled within 3 days of the proposed schedule
                (v) 100% if cancelled on the day of the flight or if the aircraft has positioned.
                
                10. Any changes/modification of ‘flight program’, requested by the customer after commencement of the ‘flight program’ and if the same
                cannot be executed due to operational reasons/lapse of relevant permissions in flight sectors will be termed as ‘a last-minute cancellation’
                and the cancellation clause of 100% would apply.
                
                11. If due to sudden deterioration of weather en-route/destination, the aircraft cannot land at the Destination OR diverted due to 
                defense services activity AND has to return to the starting point or divert to some other airport, the actual flying time and any 
                other additional charges due to the diversion would be chargeable and balance if any, would be payable / refundable.
                
                12. The above quote is only indicative and any extra flying on account of diversions due to Air Traffic Control; extra fueling halt
                on account of aircraft performance due to weight, altitude, temperature and range limitations will be billed at actuals,
                after the flight is conducted in the Final Invoice.
            
                13. Smoking is not allowed on-board.
                
                14. Sparzana Aviation Private Limited cannot be held responsible for non-operation of charter for any unforeseen reason/s such as
                Bad Weather,Poor Visibility, non – Availability of clearances from ATC / Defense Authorities / Civil Administration. Due to above
                reasons, if the flight cannot take off from the Originating station full amount will be refunded (except IFS charges).`
                ,3,100);
                }
                // Check if it's the 5th page and add content accordingly
                if (i === 4) {
                    doc.font('Times-Roman')
                        .fontSize(8.8)
                        .text(`
                15. Bank Details:`,-1,100);
                doc.image('../pdftemplate/images/bakdetails.jpg', 67, 125, {width: 200, height: 100});

                    doc.font('Times-Roman')
                    .fontSize(8.8)
                        .text(`
                16. Food Beverages:
                We would like to let you know that there are no non-vegetarian food alternatives on our aircraft, and passengers are not permitted
                to bring or eat non-vegetarian food on board.

                17. MANDATORY INFORMATION:
                Passengers must always carry, at the time of entry and/or exit from Airports a valid Photo Identification Proof,
                which may be 1. Passport; 2. Aadhaar Card; 3. Voter Id Card; 4. PAN Card; 5. Driving License;6. Nationalized Bank
                Passbook with an attested photograph; 7. A Valid Government / State Government/ Armed Services issued Service
                Photo ID card; 8. Pension Card / Disability Card with attested Photograph issued by valid Government / State Government.`,3,220);


                            doc.font('Times-Bold')
                            .fontSize(8.9)
                            .text(
                `Dear Guest`,36,350);

                            doc.font('Times-Roman')
                            .fontSize(8.8)
                            .text(`
                Greetings from SPARZANA AVIATION PRIVATE LIMITED!!!`, 1,360);

                            doc.font('Times-Roman')
                            .fontSize(8)
                            .text(`
                You are requested to kindly avoid carrying the following items equipment’s along with you while boarding the aircraft. These items are prohibited to be
                carried onboard by the Director General of Civil Aviation of India. The client here by agrees to the terms and conditions of the charter as defined above.
                            `, 6,390);

                            doc.font('Times-Bold')
                            .fontSize(9)
                            .text(`
                The client hereby agrees to the terms and conditions of the charter as defined above.
                            `, 6,460);

                doc.image('../pdftemplate/images/discription.png', 41, 490, {width: 490, height: 100});

                doc.font('Times-Bold')
                            .fontSize(9)
                            .text(`
                For SPARZANA AVIATION PRIVATE LIMITED                                                                                                          For Client
                            `, 6,630);

                doc.image('../pdftemplate/images/sparzana.png', 84, 670, {width: 90, height: 60});

                }
            }
        // Finalize PDF and save
        doc.pipe(output);
        doc.end();

        output.on('finish', () => {
            console.log('PDF generated successfully.');
            restartServer();
        });

        return output;
    }

    // Function to restart the server
    function restartServer() {
        exec('npm run dev', (error, stdout, stderr) => {
            if (error) {
                console.error(`Server restart failed: ${error}`);
                return;
            }
            console.log(`Server restarted: ${stdout}`);
        });
    }

    // Serve the PDF file
    app.get('/pdf', (req, res) => {
        res.sendFile(__dirname + '/output.pdf');
    });

    // Start the Express server
    const server = app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });

    // Generate PDF and serve it
    generatePDF();

    // Automatically refresh the PDF every time it's modified
    fs.watch(__dirname + '/output.pdf', () => {
        console.log('PDF file changed. Reloading...');
        server.close(() => {
            console.log('Server closed.');
            server.listen(3000, () => {
                console.log('Server reopened.');
            });
        });
    });

const products=[
    {
        "id": 1,
        "name":"Black Super Duty Lug Nuts (Set of 32)",
        "price":84.99,
        "image": "./Images/Store/LN_black.png",
        "description":"We offer a complete set of 32 black lug nuts with a 14x1.5 thread pitch, designed for 8 lug bolt pattern wheels. These nuts are compatible with various Ford, Chevrolet, and GMC models. The lug nuts are made of high-quality steel, and the set includes a heavy-duty nuts socket for easy installation. If you have any questions or concerns, please let us know, and we'll be happy to assist you."
    },
    {
        "id": 2,
        "name":"Silver Super Duty Lug Nuts (Set of 32)",
        "price":84.99,
        "image": "./Images/Store/LN_silver.png",
        "description":"We offer a complete set of 32 black lug nuts with a 14x1.5 thread pitch, designed for 8 lug bolt pattern wheels. These nuts are compatible with various Ford, Chevrolet, and GMC models. The lug nuts are made of high-quality steel, and the set includes a heavy-duty nuts socket for easy installation. If you have any questions or concerns, please let us know, and we'll be happy to assist you."
    },
    {
        "id": 3,
        "name":"KAYZT H11 H9 H8 LED Headlight Bulbs",
        "price":34.99,
        "image": "./Images/Store/LT_01.png",
        "description":"KAYZT H11 LED Headlight Bulb has a wireless design for easy installation, is 600% brighter than halogen, has a 1:1 ultra-focus beam pattern, an efficient cooling system, and 98% high compatibility with most vehicles. It comes with 12 pcs customized high-quality chips providing 6500K cool white light and 120W high power. The bulb is non-polarity and plug-and-play, which saves installation time, space, and cost. It increases nighttime visibility, improves the safety of night driving, and does not dazzle the oncoming drivers. Some more sensitive cars may require additional decoders/resistors to address the error codes or flashing lights on the dashboard. If you need assistance, contact the KAYZT team."
    },
    {
        "id": 4,
        "name":"KAYZT D2S D2R LED Headlight Bulbs",
        "price":64.99,
        "image": "./Images/Store/LT_02.png",
        "description":"These D2S LED headlight bulbs are 600% brighter than halogen bulbs, with 120W/Pair high power and 20,000LM/Pair high light output. The bulbs are 1:1 mini size as halogen bulbs, making them easy to install without any tools or modification needed. They have a 6500K cool white color temperature, which allows for wider and further visibility. The bulbs also have an efficient cooling system, whole aviation aluminum body, and 12,000RPM turbo cooling fan, providing a super cooling ability and a longer lifespan of up to 50,000 hours. They have a perfect beam pattern, producing the same light focus without dark spots or shadowed areas, and are compatible with 98% of vehicle's computer systems without flickering or error messages on the dash."
    },
    {
        "id": 5,
        "name":"AVID POWER Tire Inflator Air Compressor",
        "price":89.99,
        "image": "./Images/Store/TI_wireless.png",
        "description":"TThis AVID POWER car air pump is a reliable and functional device that comes with an auto shut-off feature to prevent over-inflation. It has dual power supply options, which include a 20V rechargeable Li-ion battery pack and a DC 12V power supply. The tire compressor is ergonomically designed for easy use and has built-in LED lights to illuminate the working area. It can inflate a 195/60 R14 tire in 3 mins and a 215/60 R16 tire in 5 mins. This portable tire inflator is compatible with cars, motorcycles, bicycles, sport balls, and inflatable pool toys. It comes with a cordless tire inflator, 20V Lithium-ion battery pack, 12V car power adapter, battery charger, 3 nozzles, user manual, and a tool bag for easy storage. Note that it's not suitable for large truck tires."
    },
    {
        "id": 6,
        "name":"AstroAI Tire Inflator Portable Air Compressor",
        "price":64.99,
        "image": "./Images/Store/TI_wired.png",
        "description":"The AstroAI Tire Inflator is a versatile device that allows for both 12V DC and 120V AC power supplies. It can inflate car, bicycle, and motorcycle tires, as well as sports equipment and other inflatables. With fast inflation and 15-minute continuous work, this pump is compatible with cars, bikes, sedans, and mid-sized SUVs. It features easy operation and an LED light, and includes an air hose compartment for easy storage. The package comes with a tire inflator, AC/DC power cord, 2 air nozzles, 1 needle valve adapter, 1 replacement fuse, 1 Presta to Schrader adapter and a user manual. Note: This pump is not compatible with heavy-duty trucks."
    },
    {
        "id": 7,
        "name":"26 pcs Power Car Detailing Kit (Blue)",
        "price":174.99,
        "image": "./Images/Store/CK_blue.png",
        "description":"Introducing the Professional 26 Pcs-in-1 Car Cleaning Kit - a complete car detailing kit that includes everything you need for internal and external car cleaning. This kit includes 5 sizes of car detailing brushes, 4 drill brushes, 3 wire brushes, 2 vent cleaning brushes, 1 wheel brush, 1 tire brush, 1 detachable handle, 4 strong water absorption cloth covers, a 100ml spray bottle, 1 dash duster brush, 1 towel, 1 car wash mitt, and 1 storage bag. The kit also includes a Long Handle Car Wheel Brush and a Short Handle Car Tire Brush, 5 different sizes of Car Detailing Brushes, 3 Wire Brushes, and a Soft Car Washing Tool Kit."
    },
    {
        "id": 8,
        "name":"19 pcs Car Detailing Kit (Red)",
        "price":124.99,
        "image": "./Images/Store/CK_red.png",
        "description":"This car detailing kit includes 19 pieces such as a long handle wheel cleaner brush, car detailing brushes, drill brush attachments, car wash mitt, microfiber towels, wire brush, car polishing pads, hook & loop backing pad, and an air vent brush. The kit is designed to help you clean your car without leaving any scratches. The wheel brush has soft bristles that are strong enough to clean dirt off the wheels. The drill brush attachment can clean hard to reach spaces. The detailing brush set has soft bristles and various sizes to clean different crevices, cracks, and wheel lock nuts easily. The car wash mitt and microfiber towels are perfect for washing, cleaning, and drying your car."
    },
    {
        "id": 9,
        "name":"Universal Floor Mats (Beige)",
        "price":74.99,
        "image": "./Images/Store/FM_beige.png",
        "description":"These car mats have an anti-slip design with heavy nibbed backing to keep them securely in place. They are stain resistant and easy to install and maintain. The mats are waterproof and easy to clean with a hose. They come in a fashion and sporty color and are perfect for most sedans, crossovers, SUVs, trucks, and vans. The dimensions are engineered to fit most cars, trucks, vans, and SUVs."
    },
    {
        "id": 10,
        "name":"Universal Floor Mats (Black)",
        "price":74.99,
        "image": "./Images/Store/FM_black.png",
        "description":"These car mats have an anti-slip design with heavy nibbed backing to keep them securely in place. They are stain resistant and easy to install and maintain. The mats are waterproof and easy to clean with a hose. They come in a fashion and sporty color and are perfect for most sedans, crossovers, SUVs, trucks, and vans. The dimensions are engineered to fit most cars, trucks, vans, and SUVs."
    },
    {
        "id": 11,
        "name":"Universal Floor Mats (Red)",
        "price":74.99,
        "image": "./Images/Store/FM_red.png",
        "description":"These car mats have an anti-slip design with heavy nibbed backing to keep them securely in place. They are stain resistant and easy to install and maintain. The mats are waterproof and easy to clean with a hose. They come in a fashion and sporty color and are perfect for most sedans, crossovers, SUVs, trucks, and vans. The dimensions are engineered to fit most cars, trucks, vans, and SUVs."
    },
    {
        "id": 12,
        "name":"Universal Floor Mats (Grey)",
        "price":74.99,
        "image": "./Images/Store/FM_grey.png",
        "description":"These car mats have an anti-slip design with heavy nibbed backing to keep them securely in place. They are stain resistant and easy to install and maintain. The mats are waterproof and easy to clean with a hose. They come in a fashion and sporty color and are perfect for most sedans, crossovers, SUVs, trucks, and vans. The dimensions are engineered to fit most cars, trucks, vans, and SUVs."
    },
]
const videos=[
    {
        "url":"https://www.youtube.com/embed/H9-YT9RiM84?enablejsapi=1",
        "description":"How to check your dipstick for engine oil."
    },
    {
        "url":"https://www.youtube.com/embed/3UpyixFMaH4?enablejsapi=1",
        "description":"How to Jack Up Your Car (The Right Way)"
    },
    {
        "url":"https://www.youtube.com/embed/0Q-Eb7aUyt4?enablejsapi=1",
        "description":"How to Properly inflate you Tires on Your Car"
    },
    {
        "url":"https://www.youtube.com/embed/BjX79GsALd8?enablejsapi=1",
        "description":"10 Things Every Car Owner Should Know"
    },
    {
        "url":"https://www.youtube.com/embed/Y3jcQCdeJAs?enablejsapi=1",
        "description":"How To Make Your Car Last A Long Time"
    },
    {
        "url":"https://www.youtube.com/embed/GaKKSFEsAdI?enablejsapi=1",
        "description":"Simple Car Maintenance to Prevent Expensive Repairs"
    },
    {
        "url":"https://www.youtube.com/embed/qFbNHGjtDnw?enablejsapi=1",
        "description":"How To Detail (And Sanitize) Your ENTIRE CAR"
    },
    {
        "url":"https://www.youtube.com/embed/WBxqiUhadyY?enablejsapi=1",
        "description":"9 Things You\'ll REGRET Not Doing to Your Car"
    },
    {
        "url":"https://www.youtube.com/embed/ik_HElMb5n0?enablejsapi=1",
        "description":"How to Pick BETTER Wheels & Tires for YOUR Car"
    },
]
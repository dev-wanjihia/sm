// Elapsed time since the beginning of the new event (rising or falling)
// cTime is the continuous time.
var t = 0, cTime = 0;
//  scale 1 unit = 1 cm hence 9.8m/s^2 becomes 980 units/s^2
// Physics constant for gravity default is earth
var g = 980;

// My height 1.5 meters = 150 cm = 150 units
// Height from which the ball is falling. Initialized to 10 meters
var height = 150;

// Ball is falling or rising.
var falling = height > 0;

// Initial velocity
var u = 0;

// Bounciness of the ball.
var e = 0.7;

// position vector of the ball.
var rVec = [0, height ,0];

// Make the time to increase
varyTime();

function varyTime()
{
    window.setTimeout("varyTime()", 10);
    t += 0.010;
    cTime += 0.010;

    // If the ball is falling and the time for it to stop has reached then we need to stop
    if(falling && (round(t, 2) >= round(Math.sqrt(height / (g/2)), 2)))
    {
        falling = false;
        u =  e * g * t;
        t = 0;
        height = 0;
    }
    
    //  If the ball is rising and the time to start falling has reached then we need to start falling.
    if(!falling && (round(u/g, 2) <= round(t, 2)))
    {
        falling = true;
        height = u * t - 0.5 * g * t * t;
        t = 0;
        u = 0;
    }

    rVec[1] = falling ? (-g/2*t*t + height) : (u*t - (g / 2) * t * t);

    // Add some horizontal force into the model that will always be constant
    // the force will cause the ball to roll as the ball goes.
    rVec[0] = cTime * 20;
}

// A helper function to round off numbers to the nearest n decimal places
function round(value, decimals)
{
    return Number(Math.round(value + 'e+' + decimals) + 'e-' + decimals);
}


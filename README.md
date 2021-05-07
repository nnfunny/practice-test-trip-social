# Practical tests

[Original version](https://gist.github.com/RafeHatfield/41c4943cddd3e3c5fda4b73d3fa42965)

These aren't designed to be difficult, they are designed to showcase coding style.

Please take the time you need to complete your answers to a quality that you would be comfortable submitting for a code review (i.e. production ready). Feel free to email me if you have any questions.

## Question 1:

With the array (1,2,3,4,5,6), write a recursive function that outputs:

```html
<1>
  <2>
    <3>
      <4>
        <5>
          <6>
          </6>
        </5>
      </4>
    </3>
  </2>
</1>
```

## Question 2:

Given the following string:

`"<a><b><c><d><e><f></f></e></d></c></b></a>"`

Write a program to produce the following output:

```html
<a>
	<b>
		<c>
			<d>
				<e>
					<f> </f>
				</e>
			</d>
		</c>
	</b>
</a>
```

If the string doesn’t parse to valid xml, print an error.

## Question 3 (Front-end):

Using React, create a simple one page form that takes its structure from the JSON config below. Normally the config would be read from a remote server but for this exercise you can mock a simple retrieval function which returns this hard coded JSON.

The application does not need to persist the data anywhere other than local state for this exercise. **Include a simple README.md file with instructions on how to run the application and display the working form.**

Sample form config:

```json
{
	"questions": [
		{
			"title": "Tell us about yourself",
			"fields": [
				{ "name": "first_name", "label": "First Name", "type": "text" },
				{ "name": "last_name", "label": "Last Name", "type": "text" },
				{ "name": "email", "label": "Email", "type": "text" },
				{
					"name": "phone_number",
					"label": "Phone Number",
					"type": "text"
				}
			]
		},
		{
			"title": "Where do you live?",
			"fields": [
				{
					"name": "street_address",
					"label": "Street Address",
					"type": "text"
				},
				{ "name": "post_code", "label": "Post Code", "type": "text" },
				{
					"name": "country",
					"label": "Country",
					"type": "dropdown",
					"options": ["Canada", "USA"]
				}
			]
		}
	]
}
```

After reading the above config, the application should display a form with 2 questions, "Tell us about yourself" and "Where do you live". The first question should have 4 text input fields displayed underneath, the second should have 2 text input fields and 1 dropdown. All fields should use the name and label from the config (and in the case of dropdowns, the "options" field).

The application should be structured in such a way that you are able to add new questions and fields by updating only the config. To keep things simple assume there are only 2 types of field: text inputs and dropdowns.

At the end of the form include a button which prints the current application state of your application to the browser console. The output should look similar to the below:

```json
{
	"firstName": "Lana",
	"lastName": "Kane",
	"country": "Canada",
	"email": "lana@example.com",
	"phoneNumber": "555-123-1111",
	"postCode": "V6B 1S5",
	"streetAddress": "123 Evergreen Drive"
}
```

## Question 4 (Backend)

Design an API endpoint that provides autocomplete suggestions for large cities.
The suggestions should be restricted to cities in the USA and Canada with a population above 5000 people.

-   the endpoint is exposed at `/suggestions`
-   the partial (or complete) search term is passed as a query string parameter `q`
-   the caller's location can optionally be supplied via query string parameters `latitude` and `longitude` to help improve relative scores
-   the endpoint returns a JSON response with an array of scored suggested matches
    -   the suggestions are sorted by descending score
    -   each suggestion has a score between 0 and 1 (inclusive) indicating confidence in the suggestion (1 is most confident)
    -   each suggestion has a name which can be used to disambiguate between similarly named locations
    -   each suggestion has a latitude and longitude
-   all functional tests should pass (additional tests may be implemented as necessary).

#### Sample responses

These responses are meant to provide guidance. The exact values can vary based on the data source and scoring algorithm.

**Near match**

    GET /suggestions?q=Londo&latitude=43.70011&longitude=-79.4163

```json
{
	"suggestions": [
		{
			"name": "London, ON, Canada",
			"latitude": "42.98339",
			"longitude": "-81.23304",
			"score": 0.9
		},
		{
			"name": "London, OH, USA",
			"latitude": "39.88645",
			"longitude": "-83.44825",
			"score": 0.5
		},
		{
			"name": "London, KY, USA",
			"latitude": "37.12898",
			"longitude": "-84.08326",
			"score": 0.5
		},
		{
			"name": "Londontowne, MD, USA",
			"latitude": "38.93345",
			"longitude": "-76.54941",
			"score": 0.3
		}
	]
}
```

**No match**

    GET /suggestions?q=SomeRandomCityInTheMiddleOfNowhere

```json
{
	"suggestions": []
}
```

### Non-functional

-   All code should be written in Javascript or Typescript.
-   Mitigations to handle high levels of traffic should be implemented.
-   Documentation and maintainability is a plus.

### Dataset

You can find the necessary dataset along with its description and documentation in the [`data`](data/) directory.

### Setting up the project

Clone this [repo](https://github.com/busbud/coding-challenge-backend-c)

In the project directory run:

```
nvm use
npm install
```

### Running the tests

The test suite can be run with:

```
npm run test
```

### Starting the application

To start a local server run:

```
npm run start
```

it should produce an output similar to:

```
Server running at http://127.0.0.1:2345/suggestions
```

$brands = @("bmw", "mercedes", "audi", "ferrari", "lamborghini", "tesla", "astonmartin", "lexus", "volkswagen")
foreach ($brand in $brands) {
    Invoke-WebRequest -Uri "https://cdn.simpleicons.org/$brand/white" -OutFile "src/assets/brands/$brand.svg"
}

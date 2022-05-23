'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">smart-parking-main documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthApiModule.html" data-type="entity-link" >AuthApiModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthApiModule-b19772e979aac9e7daf294d38a14f85fcf784bb6213579f55f813f1473f18f9dc42e2860fd01a5d16fcad957916819bbbb8c32df1b240044fdb8b8b5cf9cf67c"' : 'data-target="#xs-injectables-links-module-AuthApiModule-b19772e979aac9e7daf294d38a14f85fcf784bb6213579f55f813f1473f18f9dc42e2860fd01a5d16fcad957916819bbbb8c32df1b240044fdb8b8b5cf9cf67c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthApiModule-b19772e979aac9e7daf294d38a14f85fcf784bb6213579f55f813f1473f18f9dc42e2860fd01a5d16fcad957916819bbbb8c32df1b240044fdb8b8b5cf9cf67c"' :
                                        'id="xs-injectables-links-module-AuthApiModule-b19772e979aac9e7daf294d38a14f85fcf784bb6213579f55f813f1473f18f9dc42e2860fd01a5d16fcad957916819bbbb8c32df1b240044fdb8b8b5cf9cf67c"' }>
                                        <li class="link">
                                            <a href="injectables/AuthApi.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthApi</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ParkingModule.html" data-type="entity-link" >ParkingModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ParkingModule-c504791c4cabbd69b7056c127299308bc0dbd348f2fd2a8b8530458b2e824284e92bec815da27218efd7eebc28c922d8e3071276a364e08afb0dae0a7ed392f8"' : 'data-target="#xs-controllers-links-module-ParkingModule-c504791c4cabbd69b7056c127299308bc0dbd348f2fd2a8b8530458b2e824284e92bec815da27218efd7eebc28c922d8e3071276a364e08afb0dae0a7ed392f8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ParkingModule-c504791c4cabbd69b7056c127299308bc0dbd348f2fd2a8b8530458b2e824284e92bec815da27218efd7eebc28c922d8e3071276a364e08afb0dae0a7ed392f8"' :
                                            'id="xs-controllers-links-module-ParkingModule-c504791c4cabbd69b7056c127299308bc0dbd348f2fd2a8b8530458b2e824284e92bec815da27218efd7eebc28c922d8e3071276a364e08afb0dae0a7ed392f8"' }>
                                            <li class="link">
                                                <a href="controllers/ParkingController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ParkingController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ParkingModule-c504791c4cabbd69b7056c127299308bc0dbd348f2fd2a8b8530458b2e824284e92bec815da27218efd7eebc28c922d8e3071276a364e08afb0dae0a7ed392f8"' : 'data-target="#xs-injectables-links-module-ParkingModule-c504791c4cabbd69b7056c127299308bc0dbd348f2fd2a8b8530458b2e824284e92bec815da27218efd7eebc28c922d8e3071276a364e08afb0dae0a7ed392f8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ParkingModule-c504791c4cabbd69b7056c127299308bc0dbd348f2fd2a8b8530458b2e824284e92bec815da27218efd7eebc28c922d8e3071276a364e08afb0dae0a7ed392f8"' :
                                        'id="xs-injectables-links-module-ParkingModule-c504791c4cabbd69b7056c127299308bc0dbd348f2fd2a8b8530458b2e824284e92bec815da27218efd7eebc28c922d8e3071276a364e08afb0dae0a7ed392f8"' }>
                                        <li class="link">
                                            <a href="injectables/ParkingService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ParkingService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#entities-links"' :
                                'data-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Park.html" data-type="entity-link" >Park</a>
                                </li>
                                <li class="link">
                                    <a href="entities/ParkPlace.html" data-type="entity-link" >ParkPlace</a>
                                </li>
                                <li class="link">
                                    <a href="entities/ParkPlacesInfo.html" data-type="entity-link" >ParkPlacesInfo</a>
                                </li>
                                <li class="link">
                                    <a href="entities/ReservedPlace.html" data-type="entity-link" >ReservedPlace</a>
                                </li>
                                <li class="link">
                                    <a href="entities/ReservedPlaceInfo.html" data-type="entity-link" >ReservedPlaceInfo</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateParkPlaceReq.html" data-type="entity-link" >CreateParkPlaceReq</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateParkReq.html" data-type="entity-link" >CreateParkReq</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateParkResp.html" data-type="entity-link" >CreateParkResp</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateReservePlaceReq.html" data-type="entity-link" >CreateReservePlaceReq</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetParkParams.html" data-type="entity-link" >GetParkParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetParkPlaceInfoResp.html" data-type="entity-link" >GetParkPlaceInfoResp</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetParkPlaceResp.html" data-type="entity-link" >GetParkPlaceResp</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetParkResp.html" data-type="entity-link" >GetParkResp</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetParksParams.html" data-type="entity-link" >GetParksParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetParksResp.html" data-type="entity-link" >GetParksResp</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetReservedPlaceResp.html" data-type="entity-link" >GetReservedPlaceResp</a>
                            </li>
                            <li class="link">
                                <a href="classes/ParkEdgesUtils.html" data-type="entity-link" >ParkEdgesUtils</a>
                            </li>
                            <li class="link">
                                <a href="classes/ParkingServiceError.html" data-type="entity-link" >ParkingServiceError</a>
                            </li>
                            <li class="link">
                                <a href="classes/Point.html" data-type="entity-link" >Point</a>
                            </li>
                            <li class="link">
                                <a href="classes/PointTransformer.html" data-type="entity-link" >PointTransformer</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthMiddleware.html" data-type="entity-link" >AuthMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ValueOrArrayToArray.html" data-type="entity-link" >ValueOrArrayToArray</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ValuesInEnumPipe.html" data-type="entity-link" >ValuesInEnumPipe</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RoleGuard.html" data-type="entity-link" >RoleGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});